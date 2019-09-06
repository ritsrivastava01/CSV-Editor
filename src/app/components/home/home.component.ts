import { ConfirmationDialogComponent } from './../shared/confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileService } from '../../providers/file.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EuListType } from '../dash-board/drop-area/drop-area.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showDragNDropArea = false;
  showCsvEditor = false;
  isCSVEdited = false;
  constructor(private fileService: FileService, private changeDetectionRef: ChangeDetectorRef, public matDialog: MatDialog) {}

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

  /**
   *
   * Show the home page if nothing editing
   * @memberof HomeComponent
   */
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

  /**
   * show thew popup if something is edited in csv file
   *
   * @memberof HomeComponent
   */
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

  /**
   *set if csv OR grid edited
   *
   * @param {*} evt
   * @memberof HomeComponent
   */
  csvEditedHandler(evt: any) {
    this.isCSVEdited = evt;
  }
}
