import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';
import { ElectronService } from '../../providers/electron.service';
import { MatTableDataSource } from '@angular/material';
const { dialog } = require('electron').remote;
const csv = require('csv-parser');
const { app, globalShortcut } = require('electron');

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
  fileName: string;

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

    this.electronService.ipcRenderer.on('saveFile', (arg) => {
      this.saveFile();
    });
  }

  showDialog = () => {
    dialog.showOpenDialog({
      title: 'Select file',
      properties: ['openFile'],
      filters: [
        { name: 'Custom File Type', extensions: ['csv'] }]
    }, (fileNames) => {
      console.log(fileNames);
      this.fileName = fileNames !== undefined ? fileNames[0] : undefined;

      if (!this.fileName) {
        alert('Please selcted file');
        return;
      }
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


  showDateField = (filedName): boolean => this.dateFiledSet.has(filedName);

  saveFile = () => {
    this.electronService.fs.writeFile(this.fileName, this.dataSource.data, (err) => {
      if (err) {
          alert('An error ocurred updating the file' + err.message);
          console.log(err);
          return;
      }
      alert('The file has been succesfully saved');
  });
  }
  updateValue = (event: any) => {
    console.log('aa');
  }

}

