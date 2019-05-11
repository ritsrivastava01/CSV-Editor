import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';
import { MatTableDataSource, MatTabChangeEvent } from '@angular/material';
import * as path from 'path';
import { ElectronService } from '../../../../providers/electron.service';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const { Menu, MenuItem } = remote.require('electron');
const csv = require('csv-parser');
const csvTOJson = require('csvtojson');
import { parse, unparse } from 'papaparse';
import { IFile } from '../../../../providers/file.service';
const { app, globalShortcut } = require('electron');

let win;
@Component({
  selector: 'app-csv-layout',
  templateUrl: './csv-layout.component.html',
  styleUrls: ['./csv-layout.component.scss']
})
export class CsvLayoutComponent implements OnInit {

  @Input() fileList: Array<ITabGroup> = [];
  dateFiledSet = new Set();
  values = [];
  headers = [];
  dataSource;
  tableArr = [];
  displayedColumns = [];
  menu = new Menu();
  columnNames = [];
  currentFile: ITabGroup;
  delimiter: string;

  constructor(private electronService: ElectronService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.dateFiledSet.add('Agreement datum');
    this.dateFiledSet.add('Ingangsdatum');
    this.dateFiledSet.add('Inactivatie datum');
    this.dateFiledSet.add('Datum afsluiten agreement');
    this.dateFiledSet.add('Inactivatie datum -optioneel-');
    this.dateFiledSet.add('NID');
  

    // this.showDialog();
    // this.createMenu();
    // this.fileDropped();

    window.localStorage.setItem('data', 'ritesh');
    console.log(window.localStorage.getItem('data'));

    this.electronService.ipcRenderer.on('saveFile', (arg) => {
      this.saveFile();
    });

  }


  showDialog = () => {
    dialog.showOpenDialog({
      title: 'Select file',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Custom File Type', extensions: ['csv'] }]
    }, (filePaths) => {

      if (!filePaths) {
        alert('Please selected file');
        return;
      }
      this.fileList = filePaths.map(x => {
        return <ITabGroup>{
          fileName: x.replace(/^.*[\\\/]/, ''),
          filePath: x
        };
      });
      console.log(this.fileList);

      this.loadDataFromCSV(this.fileList[0]);
      // this.loadDataFromCSV(filePaths[0]);
    });
  }

  tabChanged(tabChange: MatTabChangeEvent) {
    if (tabChange !== undefined) {
      this.loadDataFromCSV(this.fileList[tabChange.index]);
      // this.loadDataFromCSV(file.filePath);
      console.log(tabChange);
    }

  }

  showDateField = (filedName): boolean => {

    return this.dateFiledSet.has(filedName);
  }



  loadDataFromCSV = (fileObject: IFile) => {
    console.table(fileObject);
    this.currentFile = fileObject;
    const file = this.electronService.fs.readFileSync(fileObject.filePath, 'utf8');
    parse(file, {
      skipEmptyLines: true,
      complete: (result) => {
        this.headers = result.data[0];
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
        console.dir(result.data);
        result.data.shift();
        this.tableArr = result.data.map(data => {
          const obj = new Object();
          this.headers.map((header, index) => obj[header] = data[index]);
          return obj;
        });
        this.delimiter = result.meta.delimiter;
        this.dataSource = new MatTableDataSource(this.tableArr);
        console.log(this.tableArr);
        fileObject.fileData = this.dataSource;
        fileObject.fileHeader = this.displayedColumns;
        this.changeDetectorRef.detectChanges();


      }
    });

  }

  loadDataFromCSV_old = (filePath) => {
    this.tableArr = [];
    this.values = [];
    this.headers = [];
    this.columnNames = [];
    this.displayedColumns = [];
    this.electronService.fs.createReadStream(filePath)
      .pipe(csv({ separator: ',' }))
      .on('data', (data) => {
        if (JSON.stringify(data).toString().indexOf(this.headers[0]) > -1) {
          this.values.push(data);
        } else {
          this.values.push(Object.values(data));
        }

        this.tableArr.push(data);
      })
      .on('headers', (data) => {

        if (data.length === 1) {
          this.headers = data.toString().split(',');
        } else {
          this.headers = data; // data.toString().split(',');
        }
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

  saveFile = () => {
    const options = {
      // Placeholder 1
      title: 'Save As',

      // Placeholder 2
      defaultPath: this.currentFile.filePath,

      // Placeholder 4
      buttonLabel: 'Save CSV File',

      // Placeholder 3
      filters: [
        { name: 'csv File', extensions: ['csv'] }
      ]
    };

    const WIN = remote.getCurrentWindow();
    const fileName = dialog.showSaveDialog(WIN, options);
    const csvData = unparse(this.dataSource.data, {
      delimiter: this.delimiter
    });

    console.log(csvData);
    // this.electronService.fs.writeFile(fileName, csvData, (err) => {
    //   if (err) {
    //     alert('An error ocurred updating the file' + err.message);
    //     console.log(err);
    //     return;
    //   }
    //   alert('The file has been succesfully saved');
    // });
  }

  /* fileDropped = () => {
    const holder = document.getElementById('drag-file');
    holder.ondragover = (e: any) => {
      e.target.classList.add('box-drag-over');
      return false;
    };

    holder.ondragleave = (e: any) => {
      e.target.classList.remove('box-drag-over');
      return false;
    };

    // holder.addEventListener('dragenter', function(event) {
    //     event.target.style.border = '3px dotted red';
    // });

    holder.ondragend = () => {
      return false;
    };

    holder.ondrop = (e: any) => {
      e.preventDefault();
      const fileList: File[] = Array.from(e.dataTransfer.files);
      this.tabGroup = fileList.filter((x: File) => path.extname(x.path) === '.csv').map((y: File) => {
        return <ITabGroup>{
          fileName: y.name,
          filePath: y.path
        };
      });
      console.log(this.tabGroup);
      this.loadDataFromCSV(this.tabGroup[0]);
      return false;
    };
  } */

  createContextMenu = () => {

    // Build menu one item at a time, unlike
    this.menu.append(new MenuItem({
      label: 'Save File As',
      click() {
        console.log(this);
        win.webContents.send('saveFile', 'save-file');
        // this.saveFile();
      }
    }));

    this.menu.append(new MenuItem({ type: 'separator' }));
    this.menu.append(new MenuItem({
      label: 'Reload',
      click() {
        this.loadDataFromCSV(this.currentFile);
      }
    }));

    // Prevent default action of right click in chromium. Replace with our menu.
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.menu.popup(this.electronService.remote.getCurrentWindow());
    }, false);
  }

}

