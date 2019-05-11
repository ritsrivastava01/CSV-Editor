import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
const { dialog } = require('electron').remote;

export interface IFile {
  fileName: string;
  filePath: string;
  fileData?: any;
  fileHeader?: any;
}

@Injectable()
export class FileService {

  selectedFiles: ReplaySubject<Array<IFile>> = new ReplaySubject();
  private files: Array<IFile> = [];
  constructor() {

  }

  showDialog = (selectFolder: Boolean = false) => {
    // this.tabGroup= ['tab1','tab3','tab3'];
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
      this.files = filePaths.map(x => {
        return <IFile>{
          fileName: x.replace(/^.*[\\\/]/, ''),
          filePath: x
        };
      });
      this.selectedFiles.next(this.files);

      //this.loadDataFromCSV(this.selectedFile[0]);
      // this.loadDataFromCSV(filePaths[0]);
    });
  }
}