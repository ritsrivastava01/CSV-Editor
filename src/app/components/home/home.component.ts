import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';
import { ElectronService } from '../../providers/electron.service';
import { MatTableDataSource, MatTabChangeEvent } from '@angular/material';
const { dialog } = require('electron').remote;
const csv = require('csv-parser');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dateFiledSet = new Set();
  values = [];
  headers = [];
  dataSource;
  tableArr = [];
  displayedColumns = [];
  tabGroup:Array<ITabGroup> = [];
  /**
       * Pre-defined columns list for user table
       */
  columnNames = [];

  constructor(private electronService: ElectronService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dateFiledSet.add('Agreement datum');
    this.dateFiledSet.add('Ingangsdatum');
    this.dateFiledSet.add('Inactivatie datum');
    this.dateFiledSet.add('Datum afsluiten agreement');
    this.dateFiledSet.add('Inactivatie datum -optioneel-');

    this.showDialog();

  }

  showDialog = () => {
    //this.tabGroup= ['tab1','tab3','tab3'];
    dialog.showOpenDialog({
      title: 'Select file',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Custom File Type', extensions: ['csv'] }]
    }, (filePaths) => {
      this.tabGroup = filePaths.map(x => {
        return <ITabGroup>{
          fileName: x.replace(/^.*[\\\/]/, ''),
          filePath:x
      }});
      console.log(this.tabGroup);
      this.loadDataFromCSV(filePaths[0]);
    });
  }

  tabChanged(tabChange: MatTabChangeEvent) {
    if (tabChange !== undefined) {
      let file:ITabGroup = this.tabGroup[tabChange.index];
      this.loadDataFromCSV(file.filePath);
      console.log(tabChange);
    }

  }

  showDateField = (filedName): boolean => {
    return this.dateFiledSet.has(filedName);
  }

  loadDataFromCSV = (filePath) => {
    this.tableArr =[];
    this.values=[];
    this.headers=[];
    this.columnNames=[];
    this.displayedColumns =[];
    this.electronService.fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        this.values.push(Object.values(data));
        this.tableArr.push(data);
      })
      .on('headers', (data) => {
        this.headers = data;// data.toString().split(',');
        this.headers = this.headers.filter(function (el) {
          return el !== '';
        });
        this.columnNames = this.headers.map((x, index) => {
          return {
            id: x,
            value: x
          };
        });
        this.displayedColumns = this.columnNames.map(x => x.id);
      })
      .on('end', () => {

        this.dataSource = new MatTableDataSource(this.tableArr);
        this.changeDetectorRef.detectChanges();

      });
  }

}

export interface ITabGroup {
  fileName: string;
  filePath: string;
}

