import { TranslateService } from '@ngx-translate/core';
import { FileService, IFile } from './../../../../providers/file.service';
import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ElectronService } from '../../../../providers/electron.service';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const { Menu, MenuItem } = remote.require('electron');
import { unparse } from 'papaparse';
import { Observable, of, forkJoin } from 'rxjs';
import { CellValueChangedEvent } from 'ag-grid-community';

let WIN;

@Component({
  selector: 'app-csv-layout',
  templateUrl: './csv-layout.component.html',
  styleUrls: ['./csv-layout.component.scss']
})
export class CsvLayoutComponent implements OnInit, OnDestroy {
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
  IsEdited = false;
  tempDataRow: Observable<Array<any>>;
  headerRow: Observable<Array<any>>;
  @Output() isGridEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  private gridApi;

  dummyFile: IFile = {
    fileName: undefined,
    fileData: undefined
  };

  constructor(private electronService: ElectronService, private changeDetectorRef: ChangeDetectorRef, private fileService: FileService, private translate: TranslateService) {}

  isVisible = false;

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
    this.IsEdited = false;
    this.isGridEdited.emit(false);
  }
  onAddRow() {
    const newItem = this.fileService.getBlankRow();
    newItem['Sr No'] = this.gridApi.getDisplayedRowCount() + 1;
    this.gridApi.updateRowData({ add: [newItem] });
    // printResult(res);
  }

  getRowData() {
    const rowData = [];

    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    this.IsEdited = true;
    this.isGridEdited.emit(this.IsEdited);
  }
  onCellValueChanged(params: CellValueChangedEvent) {
    if (!this.IsEdited) {
      this.IsEdited = params.newValue !== params.oldValue;
      this.isGridEdited.emit(this.IsEdited);
    }
  }

  ngOnInit() {
    WIN = remote.getCurrentWindow();

    this.fileService.selectedFiles.subscribe(x => {
      this.headerRow = of([]);
      this.tempDataRow = of([]);

      this.fileList = x;
      if (this.fileList.length > 0) {
        this.fileService.loadDataFromCSV(this.fileList[0]);
        if (!this.fileList[0].fileData) {
          this.loadCSVFile(this.fileList[0]);
          this.isVisible = true;
        }
      } else {
        this.isVisible = false;
      }
      this.changeDetectorRef.detectChanges();
    });

    this.createContextMenu();

    this.electronService.ipcRenderer.on('saveFile', () => {
      if (this.fileList.length !== 0) {
        this.getRowData();
        this.saveFile();
      }
    });
    this.electronService.ipcRenderer.on('uploadFile', () => {
      this.fileService.showDialog();
    });

    this.electronService.ipcRenderer.on('reloadFile', () => {
      // tslint:disable-next-line: no-unused-expression
      this.currentFile && this.loadCSVFile(this.currentFile);
    });
  }
  ngOnDestroy() {}
  showDialog = () => {
    this.fileService.showDialog();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onQuickFilterChanged(filterValue: string) {
    this.gridApi.setQuickFilter(filterValue);
  }

  onSaveClicked = () => {
    this.saveFile();
  }
  tabChanged(tabChange: MatTabChangeEvent) {
    if (tabChange !== undefined && tabChange.index >= 0) {
      const selectedFile = this.fileList[tabChange.index];
      if (!selectedFile.fileData) {
        // this.setCsvData(this.dummyFile);
        this.loadCSVFile(selectedFile);
      } else {
        this.setCsvData(selectedFile);
      }
    }
  }
  setCsvData(updateFile: IFile) {
    this.delimiter = updateFile.delimiter;
    this.dataSource = updateFile.fileData;
    this.displayedColumns = updateFile.fileHeader;
    this.columnNames = updateFile.columnName;
    setTimeout(() => {
      this.generateDataForAgGrid(updateFile);
    }, 500);

    this.changeDetectorRef.detectChanges();
  }

  generateDataForAgGrid = (file: IFile) => {
    this.headerRow = of(
      file.fileHeader.map((x, index) => {
        // TODO: improve the approach
        let obj = new Object();
        obj = {
          headerName: x,
          field: x,
          sortable: true,
          filter: index === 0 ? false : true,
          editable: true,
          resizable: true
        };
        if (index === 0) {
          obj['resizable'] = false;
          obj['editable'] = false;
          obj['headerCheckboxSelection'] = true;
          obj['headerCheckboxSelectionFilteredOnly'] = true;
          obj['checkboxSelection'] = true;
          obj['width'] = 100;
        }
        return obj;
      })
    );
    this.tempDataRow = of(file.fileData);
  }

  loadCSVFile = (file: IFile) => {
    this.fileService.loadDataFromCSV(file).subscribe((updateFile: IFile) => {
      this.currentFile = updateFile;
      file = updateFile;
      this.setCsvData(file);
    });
  }

  // showDateField = (filedName): boolean => {
  //   return this.dateFiledSet.has(filedName);
  // }

  saveFile = () => {
    let title, buttonText;
    this.translate.get('scv-editor.save-as-window-title').subscribe(x => (title = x));
    this.translate.get('scv-editor.save-as-window-button-text').subscribe(x => (buttonText = x));

    const options = {
      // Placeholder 1
      title: title,

      // Placeholder 2
      defaultPath: this.currentFile.filePath,

      // Placeholder 4
      buttonLabel: buttonText,

      // Placeholder 3
      filters: [{ name: 'csv File', extensions: ['csv'] }]
    };
    const fileName = dialog.showSaveDialog(WIN, options);
    const csvData = unparse(this.dataSource, {
      delimiter: this.delimiter
    });

    this.electronService.fs.writeFile(fileName, csvData, err => {
      if (err) {
        this.translate.get('scv-editor.error-while-saving').subscribe(x => alert(x + err.message));
        return;
      }
      this.IsEdited = false;
      this.isGridEdited.emit(false);
      console.log(fileName, csvData);
      this.translate.get('scv-editor.save-message').subscribe(x => {
        alert(x);
        const file: IFile = {
          fileName: fileName.replace(/^.*[\\\/]/, ''),
          filePath: fileName
        };
        const currentFileIndex = this.fileList.findIndex(objFile => objFile.fileName === this.currentFile.fileName);
        this.fileList[currentFileIndex] = file;
        this.fileService.loadFilesInApplication(this.fileList);
      });
    });
  }

  createContextMenu = () => {
    forkJoin(this.translate.get('scv-editor.menu-save-as'), this.translate.get('scv-editor.reload')).subscribe(x => {
      this.menu.append(
        new MenuItem({
          label: x[0],
          click() {
            WIN.webContents.send('saveFile', 'save-file');
          }
        })
      );

      this.menu.append(new MenuItem({ type: 'separator' }));
      this.menu.append(
        new MenuItem({
          label: x[1],
          click() {
            WIN.webContents.send('reloadFile', 'reload-file');
          }
        })
      );

      window.addEventListener(
        'contextmenu',
        e => {
          e.preventDefault();
          this.menu.popup(this.electronService.remote.getCurrentWindow());
        },
        false
      );
    });
  }
}
