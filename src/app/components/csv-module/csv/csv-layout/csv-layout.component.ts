import { map } from 'rxjs/operators';
import { FileService, IFile } from './../../../../providers/file.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  ViewChild,
  HostBinding,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core';
import {
  MatTableDataSource,
  MatTabChangeEvent,
  MatPaginator
} from '@angular/material';
import * as path from 'path';
import { ElectronService } from '../../../../providers/electron.service';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const { Menu, MenuItem } = remote.require('electron');
const csv = require('csv-parser');
import { parse, unparse } from 'papaparse';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Observable, of } from 'rxjs';
const { app, globalShortcut } = require('electron');
import * as $ from 'jquery';
import { CellValueChangedEvent } from 'ag-grid-community';

let win;

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
  tempheaderRow: Observable<Array<any>>;
  @Output() isGridEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  private gridApi;
  private gridColumnApi;
  private rowSelection = 'multiple';

  dummyFile: IFile = {
    fileName: undefined,
    fileData: undefined
  };

  selectedFile: any;

  constructor(
    private electronService: ElectronService,
    private changeDetectorRef: ChangeDetectorRef,
    private fileService: FileService
  ) {}
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  isVisible = false;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    this.IsEdited= false;
    this.isGridEdited.emit(false);
  }
  onAddRow() {
    const newItem = this.fileService.getBlankRow();
    newItem['Sr No'] = this.gridApi.getDisplayedRowCount() + 1;
    console.log(newItem);
    this.gridApi.updateRowData({ add: [newItem] });
    // printResult(res);
  }

  getRowData() {
    let rowData = [];
    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res);
  }
  onCellValueChanged(params: CellValueChangedEvent) {
    if (!this.IsEdited) {
      this.IsEdited = params.newValue !== params.oldValue;
      this.isGridEdited.emit(this.IsEdited);
    }
  }

  ngOnInit() {
    this.fileService.selectedFiles.subscribe(x => {
      this.fileList = x;
      if (this.fileList.length > 0) {
        this.fileService.loadDataFromCSV(this.fileList[0]);
        if (!this.fileList[0].fileData) {
          this.laodData(this.fileList[0]);
          this.isVisible = true;
        }
      } else {
        this.isVisible = false;
      }
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
    // this.fileDropped()
    this.electronService.ipcRenderer.on('saveFile', arg => {
      this.getRowData();
      // this.saveFile();
    });
  }
  ngOnDestroy() {
    console.log('unsubscribe');
    // this.fileService.selectedFiles.unsubscribe();
  }
  showDialog = () => {
    this.fileService.showDialog();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  tabChanged(tabChange: MatTabChangeEvent) {
    if (tabChange !== undefined && tabChange.index >= 0) {
      const selctedFile = this.fileList[tabChange.index];
      if (!selctedFile.fileData) {
        // this.setCsvData(this.dummyFile);
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
    // this.dataSource.paginator = this.paginator;

    this.generateDataForAgGrid(updateFile);
    this.changeDetectorRef.detectChanges();
    console.log(updateFile);
  }

  generateDataForAgGrid = (file: IFile) => {
    this.tempheaderRow = of(
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
          // cellEditor: 'agLargeTextCellEditor',
        };
        if (index === 0) {
          obj['resizabl'] = false;
          obj['width'] = 70;
        }
        return obj;
      })
    );
    this.tempheaderRow.subscribe(c => console.log(c));
    this.tempDataRow = of(file.fileData.data);
  }

  laodData(file: IFile) {
    this.fileService.loadDataFromCSV(file).subscribe((updateFile: IFile) => {
      this.currentFile = updateFile;
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
      filters: [{ name: 'csv File', extensions: ['csv'] }]
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
    this.menu.append(
      new MenuItem({
        label: 'Save File As',
        click() {
          console.log(this);
          win.webContents.send('saveFile', 'save-file');
          // this.saveFile();
        }
      })
    );

    this.menu.append(new MenuItem({ type: 'separator' }));
    this.menu.append(
      new MenuItem({
        label: 'Reload',
        click() {
          this.loadDataFromCSV(this.currentFile);
        }
      })
    );

    // Prevent default action of right click in chromium. Replace with our menu.
    window.addEventListener(
      'contextmenu',
      e => {
        e.preventDefault();
        this.menu.popup(this.electronService.remote.getCurrentWindow());
      },
      false
    );
  }
}

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function(params) {
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    $(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
  };
  Datepicker.prototype.getGui = function() {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function() {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function() {};
  Datepicker.prototype.isPopup = function() {
    return false;
  };
  return Datepicker;
}
