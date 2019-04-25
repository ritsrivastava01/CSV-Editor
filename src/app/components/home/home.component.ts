import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';
import { ElectronService } from '../../providers/electron.service';
import { MatTableDataSource } from '@angular/material';
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
    dialog.showOpenDialog({
      title: 'Select file',
      properties: ['openFile'],
      filters: [
        { name: 'Custom File Type', extensions: ['csv'] }]
    }, (fileNames) => {
      console.log(fileNames);
      this.electronService.fs.createReadStream(fileNames[0])
        .pipe(csv())
        .on('data', (data) => {
          this.values.push(Object.values(data));
          this.tableArr.push(data);
        })
        .on('headers', (data) => {
          this.headers = data.toString().split(',');
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
    });
  }

  showDateField = (filedName): boolean => {
    return this.dateFiledSet.has(filedName);
  }

}

