import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, of, Observer } from 'rxjs';
import { ElectronService } from './electron.service';
const { dialog } = require('electron').remote;
import { parse, unparse } from 'papaparse';
import { MatTableDataSource } from '@angular/material';

export interface IFile {
  fileName?: string;
  filePath?: string;
  fileData?: any;
  fileHeader?: any;
  columnName?: any;
  delimiter?: string;
}

@Injectable()
export class FileService {

  selectedFiles: ReplaySubject<Array<IFile>> = new ReplaySubject();
  private files: Array<IFile> = [];
  constructor(private electronService: ElectronService) {

  }

  showDialog = (selectFolder: Boolean = false) => {
    dialog.showOpenDialog({
      title: 'Select file',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Custom File Type', extensions: ['csv'] }]
    }, (filePaths) => {

      if (!filePaths) {
        // alert('Please selected file');
        return;
      }
      this.files = filePaths.map(x => {
        return <IFile>{
          fileName: x.replace(/^.*[\\\/]/, ''),
          filePath: x
        };
      });
      this.loadFilesInApplication(this.files);
    });
  }

  loadFilesInApplication = (files: Array<IFile>) => {
    this.saveRecentFileListToLocalStogare(files);

    this.selectedFiles.next(files);
  }

  private saveRecentFileListToLocalStogare = (fileList: Array<IFile>) => {
    // window.localStorage.removeItem('csv_editor_fileList');


    const savedFiles = window.localStorage.getItem('csv_editor_fileList') ?
      JSON.parse(window.localStorage.getItem('csv_editor_fileList')) : [];

    const fileToSave = JSON.stringify(fileList.concat(savedFiles).slice(0, 5).map(x => <IFile>{
      fileName: x.fileName,
      filePath: x.filePath
    }));
    console.table(JSON.parse(fileToSave));
    window.localStorage.setItem('csv_editor_fileList', fileToSave);
  }

  getRecentSavedFiles = (): Array<IFile> => {
    return window.localStorage.getItem('csv_editor_fileList') ?
      JSON.parse(window.localStorage.getItem('csv_editor_fileList')) : [];

  }


  loadDataFromCSV = (fileObject: IFile): Observable<IFile> => {
    let headers = [], columnNames = [], displayedColumns = [], tableArr = [];
    const file = this.electronService.fs.readFileSync(fileObject.filePath, 'utf8');
    return new Observable((observer: Observer<IFile>) => {
      parse(file, {
        skipEmptyLines: true,
        complete: (result) => {
          headers = result.data[0];
          headers = headers.filter(function (el) {
            return el !== '';
          });
          columnNames = headers.map((x, index) => {
            return {
              id: x,
              value: x
            };
          });
          columnNames.unshift({ id: 'poss', value: 'Possition' });
          displayedColumns = columnNames.map(x => x.id);
          console.dir(result.data);
          result.data.shift();
          const arrData = [];
          result.data.map(y => {
            if (y.filter(x => x === '').length !== y.length) {
              arrData.push(y);
            }
          });

          tableArr = arrData.map((data, ind) => {
            const obj = new Object();
            headers.map((header, index) => obj[header] = data[index]);
            obj['poss'] = ind;
            return obj;
          });


          fileObject.fileData = new MatTableDataSource(tableArr);
          fileObject.fileHeader = displayedColumns;
          fileObject.columnName = columnNames;
          fileObject.delimiter = result.meta.delimiter;
          observer.next(fileObject);

        }
      });
    });

  }
}
