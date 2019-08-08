import { map } from 'rxjs/operators';
import { FileService, IFile } from './../../../../providers/file.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { ElectronService } from '../../../../providers/electron.service';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const { Menu, MenuItem } = remote.require('electron');
const csv = require('csv-parser');
import { unparse } from 'papaparse';
import { Observable, of } from 'rxjs';
import * as $ from 'jquery';
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
  tempheaderRow: Observable<Array<any>>;
  @Output() isGridEdited: EventEmitter<boolean> = new EventEmitter<boolean>();

  private gridApi;
  private gridColumnApi;
  private rowSelection = 'multiple';

  dummyFile: IFile = {
    fileName: undefined,
    fileData: undefined
  };

  constructor(
    private electronService: ElectronService,
    private changeDetectorRef: ChangeDetectorRef,
    private fileService: FileService
  ) {}

  isVisible = false;

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
    const res = this.gridApi.updateRowData({ remove: selectedData });
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
      this.tempheaderRow = of([]);
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

    // NOT IN USE
    /*
    this.dateFiledSet.add('Agreement datum');
    this.dateFiledSet.add('Ingangsdatum');
    this.dateFiledSet.add('Inactivatie datum');
    this.dateFiledSet.add('Datum afsluiten agreement');
    this.dateFiledSet.add('Inactivatie datum -optioneel-');
    this.dateFiledSet.add('NID'); */

    this.createContextMenu();

    this.electronService.ipcRenderer.on('saveFile', arg => {
      this.getRowData();
      this.saveFile();
    });

    this.electronService.ipcRenderer.on('reloadFile', arg => {
      this.loadCSVFile(this.currentFile);
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
    // this.dataSource.paginator = this.paginator;
    setTimeout(() => {
      this.generateDataForAgGrid(updateFile);
    }, 500);

    this.changeDetectorRef.detectChanges();
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
        };
        if (index === 0) {
          obj['resizabl'] = false;
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
    const fileName = dialog.showSaveDialog(WIN, options);
    const csvData = unparse(this.dataSource, {
      delimiter: this.delimiter
    });

    this.electronService.fs.writeFile(fileName, csvData, err => {
      if (err) {
        alert('An error ocurred updating the file' + err.message);
        return;
      }
      this.IsEdited = false;
      this.isGridEdited.emit(false);
      alert('The file has been saved successfully.');
    });
  }

  createContextMenu = () => {
    // Build menu one item at a time, unlike
    this.menu.append(
      new MenuItem({
        label: 'Save File As',
        click() {
          WIN.webContents.send('saveFile', 'save-file');
        }
      })
    );

    this.menu.append(new MenuItem({ type: 'separator' }));
    this.menu.append(
      new MenuItem({
        label: 'Reload',
        click() {
          WIN.webContents.send('reloadFile', 'reload-file');
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
