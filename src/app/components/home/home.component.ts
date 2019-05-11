import { EuListType } from './../dashboard/left-dashboard/left-dashboard.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { FileService } from '../../providers/file.service';
import { Router } from '@angular/router';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showDragNDropArea = false;
  showCsvEditor =false;
  constructor(private fileService: FileService, private router: Router, private changeDetectionRef: ChangeDetectorRef) { }

  ngOnInit() {
    localStorage.setItem('file 1', 'C://programefiles/test1.txt');
    console.log(localStorage.getItem('file 1'));
    this.fileService.selectedFiles.subscribe(x => {
      console.log(x);
      this.showCsvEditor = true;
      this.changeDetectionRef.detectChanges();
    });
  }
  cancelClickedHandler = (evt: any) => {
    this.showDragNDropArea = evt.data;
  }

  leftListItemClickedHandler = (evt: EuListType) => {
    switch (evt) {
      case EuListType.OPEN_FILE:
       this.fileService.showDialog(false);
        break;
      case EuListType.OPEN_FOLDER:

        break;
      case EuListType.DRAG_AND_DROP:
        this.showDragNDropArea = true;
        break;
    }
  }
}

