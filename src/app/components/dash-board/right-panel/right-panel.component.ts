import { EuListType } from './../drop-area/drop-area.component';
import { FileService, IFile } from './../../../providers/file.service';
import { INavigationItem } from './../dash-board.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  @Input() clickedNavigationItem: INavigationItem;
  @Output() opneFileItemClicked: EventEmitter<EuListType> = new EventEmitter();
  recentFiles: Array<IFile> = [];
  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.recentFiles = this.fileService.getRecentSavedFiles();
    console.log(this.recentFiles);
  }

  loadFile(file: IFile) {
    this.fileService.loadFilesInApplication([file]);
  }
  opneFileItemClickedHandler = (evt: EuListType) => {
    this.opneFileItemClicked.emit(evt);
  }
}
