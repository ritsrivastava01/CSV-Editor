import { Injectable } from '@angular/core';
import { Observer, Observable, of } from 'rxjs';
const { dialog } = require('electron').remote;

export interface IFile {
    fileName: string;
    filePath: string;
  }
  
@Injectable()
export class FileService{

    selectedFile:Observable<Array<IFile>>;
    
    constructor(){

    }

    showDialog = () => {
        // this.tabGroup= ['tab1','tab3','tab3'];
        dialog.showOpenDialog({
          title: 'Select file',
          properties: ['openFile', 'multiSelections'],
          filters: [
            { name: 'Custom File Type', extensions: ['csv'] }]
        }, (filePaths) => {
    
          if (!filePaths) {
            alert('Please selcted file');
            return;
          }
          this.selectedFile = of(filePaths.map(x => {
            return <IFile>{
              fileName: x.replace(/^.*[\\\/]/, ''),
              filePath: x
            };
          }));
          console.log(this.selectedFile);
    
          //this.loadDataFromCSV(this.selectedFile[0]);
          // this.loadDataFromCSV(filePaths[0]);
        });
      }
}