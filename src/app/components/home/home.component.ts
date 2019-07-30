import { ConfirmationDialogComponent } from './../shared/confirmation-dialog/confirmation-dialog.component';
import { EuListType } from './../dashboard/left-dashboard/left-dashboard.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileService } from '../../providers/file.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showDragNDropArea = false;
  showCsvEditor = false;
  isCSVEdited = false;
  constructor(
    private fileService: FileService,
    private router: Router,
    private changeDetectionRef: ChangeDetectorRef,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.fileService.selectedFiles.subscribe(x => {
      this.showCsvEditor = x.length > 0;
      this.showDragNDropArea = false;
      this.changeDetectionRef.detectChanges();
    });
  }
  cancelClickedHandler = (evt: any) => {
    this.showDragNDropArea = evt.data;
  }
  loadHomePage = () => {
    if (!this.isCSVEdited) {
      this.showCsvEditor = false;
      this.showDragNDropArea = false;
      this.fileService.selectedFiles.next([]);
      this.changeDetectionRef.detectChanges();
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    if (this.isCSVEdited) {
      const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: 'You will be lost all changes. Do you want to continue?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Save the file
          this.isCSVEdited = false;
          this.loadHomePage();
        }
      });
    }
  }

  gridEdited(evt: any) {
    this.isCSVEdited = evt;
  }

  leftListItemClickedHandler = (evt: EuListType) => {
    switch (evt) {
      case EuListType.OPEN_FILE:
        this.fileService.showDialog(false);
        break;
      case EuListType.OPEN_FOLDER:
        this.fileService.showDialog(true);
        break;
      case EuListType.DRAG_AND_DROP:
        this.showDragNDropArea = true;
        break;
    }
  }
}
