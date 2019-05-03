import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';
import { ElectronService } from '../../providers/electron.service';
import { MatTableDataSource, MatTabChangeEvent } from '@angular/material';
import * as path from 'path';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const { Menu, MenuItem } = remote.require('electron');
const csv = require('csv-parser');


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // dateFiledSet = new Set();
  // values = [];
  // headers = [];
  // dataSource;
  // tableArr = [];
  // displayedColumns = [];
  // tabGroup: Array<ITabGroup> = [];
  // menu = new Menu();
  /**
       * Pre-defined columns list for user table
       */
  columnNames = [];
  showFiller = true;
  constructor() { }

  ngOnInit() {
  }

  // showDialog = () => {
  //   // this.tabGroup= ['tab1','tab3','tab3'];
  //   dialog.showOpenDialog({
  //     title: 'Select file',
  //     properties: ['openFile', 'multiSelections'],
  //     filters: [
  //       { name: 'Custom File Type', extensions: ['csv'] }]
  //   }, (filePaths) => {

  //     if (filePaths) {
  //       alert('Please selcted file');
  //       return;
  //     }
  //     this.tabGroup = filePaths.map(x => {
  //       return <ITabGroup>{
  //         fileName: x.replace(/^.*[\\\/]/, ''),
  //         filePath: x
  //       };
  //     });
  //     console.log(this.tabGroup);
  //     this.loadDataFromCSV(filePaths[0]);
  //   });
  // }

  // tabChanged(tabChange: MatTabChangeEvent) {
  //   if (tabChange !== undefined) {
  //     const file: ITabGroup = this.tabGroup[tabChange.index];
  //     this.loadDataFromCSV(file.filePath);
  //     console.log(tabChange);
  //   }

  // }

  // showDateField = (filedName): boolean => {
  //   return this.dateFiledSet.has(filedName);
  // }

  // loadDataFromCSV = (filePath) => {
  //   this.tableArr = [];
  //   this.values = [];
  //   this.headers = [];
  //   this.columnNames = [];
  //   this.displayedColumns = [];
  //   this.electronService.fs.createReadStream(filePath)
  //     .pipe(csv({ separator: ';' }))
  //     .on('data', (data) => {
  //       this.values.push(Object.values(data));
  //       this.tableArr.push(data);
  //     })
  //     .on('headers', (data) => {
  //       this.headers = data; // data.toString().split(',');
  //       this.headers = this.headers.filter(function (el) {
  //         return el !== '';
  //       });
  //       this.columnNames = this.headers.map((x, index) => {
  //         return {
  //           id: x,
  //           value: x
  //         };
  //       });
  //       this.displayedColumns = this.columnNames.map(x => x.id);
  //     })
  //     .on('end', () => {

  //       this.dataSource = new MatTableDataSource(this.tableArr);
  //       this.changeDetectorRef.detectChanges();

  //     });
  // }
 
  // saveFile = () => {
  //   this.electronService.fs.writeFile(this.tabGroup[0].filePath, this.dataSource.data, (err) => {
  //     if (err) {
  //         alert('An error ocurred updating the file' + err.message);
  //         console.log(err);
  //         return;
  //     }
  //     alert('The file has been succesfully saved');
  // });
  // }

  // fileDropped = () => {
  //   const holder = document.getElementById('drag-file');
  //   holder.ondragover = (e: any) => {
  //     e.target.classList.add('box-drag-over');
  //     return false;
  //   };

  //   holder.ondragleave = (e: any) => {
  //     e.target.classList.remove('box-drag-over');
  //     return false;
  //   };

  //   // holder.addEventListener('dragenter', function(event) {
  //   //     event.target.style.border = '3px dotted red';
  //   // });

  //   holder.ondragend = () => {
  //     return false;
  //   };

  //   holder.ondrop = (e: any) => {
  //     e.preventDefault();
  //     const fileList: File[] = Array.from(e.dataTransfer.files);
  //     this.tabGroup = fileList.filter((x: File) => path.extname(x.path) === '.csv').map((y: File) => {
  //       return <ITabGroup>{
  //         fileName: y.name,
  //         filePath: y.path
  //       };
  //     });
  //     console.log(this.tabGroup);
  //     this.loadDataFromCSV(this.tabGroup[0].filePath);
  //     return false;
  //   };
  // }

  // createMenu = () => {

  //   // Build menu one item at a time, unlike
  //   this.menu.append(new MenuItem({
  //     label: 'Save File',
  //     click() {
  //       console.log('item 1 clicked');
  //     }
  //   }));

  //   this.menu.append(new MenuItem({ type: 'separator' }));
  //   this.menu.append(new MenuItem({
  //     label: 'Reload',
  //     click() {
  //       console.log('item 3 clicked');
  //     }
  //   }));

  //   // Prevent default action of right click in chromium. Replace with our menu.
  //   window.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //     this.menu.popup(this.electronService.remote.getCurrentWindow());
  //   }, false);
  // }

}



// export interface ITabGroup {
//   fileName: string;
//   filePath: string;
// }
