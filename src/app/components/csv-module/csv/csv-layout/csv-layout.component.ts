import { FileService, IFile } from './../../../../providers/file.service';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatTableDataSource, MatTabChangeEvent } from '@angular/material';
import * as path from 'path';
import { ElectronService } from '../../../../providers/electron.service';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const { Menu, MenuItem } = remote.require('electron');
const csv = require('csv-parser');
import { parse, unparse } from 'papaparse';
const { app, globalShortcut } = require('electron');

let win;


@Component({
  selector: 'app-csv-layout',
  templateUrl: './csv-layout.component.html',
  styleUrls: ['./csv-layout.component.scss']
})
export class CsvLayoutComponent implements OnInit {

  @Input() fileList: Array<IFile> = [];
  dateFiledSet = new Set();
  values = [];
  headers = [];
  dataSource;
  tableArr = [];
  displayedColumns = [];
  menu = new Menu();
  columnNames = [];
  currentFile: IFile;
  delimiter: string;

  dummyFile:IFile={
    fileName:undefined,
    fileData:undefined
  }
  
  constructor(private electronService: ElectronService, private changeDetectorRef: ChangeDetectorRef, private fileService: FileService) { }


  ngOnInit() {

    this.fileService.selectedFiles.subscribe(x => {
      this.fileList = x;
      this.changeDetectorRef.detectChanges();
    });

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
    this.fileService.showDialog();
  }




  tabChanged(tabChange: MatTabChangeEvent) {
    if (tabChange !== undefined) {
      const selctedFile = this.fileList[tabChange.index];
      if (!selctedFile.fileData) {
        this.setCsvData(this.dummyFile);
        this.laodData(selctedFile);
      } else {
        this.setCsvData(selctedFile);
      }


    }

  }
  setCsvData(updateFile: IFile) {
    this.delimiter = updateFile.delimiter;
    this.dataSource = updateFile.fileData;
    this.displayedColumns = updateFile.fileHeader;
    this.columnNames = updateFile.columnName;
    this.changeDetectorRef.detectChanges();
    console.log(updateFile);
  }

  laodData(file: IFile) {
    this.fileService.loadDataFromCSV(file).subscribe((updateFile: IFile) => {
      file = updateFile;
      this.setCsvData(file);
    });
  }

  showDateField = (filedName): boolean => {
    return this.dateFiledSet.has(filedName);
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

