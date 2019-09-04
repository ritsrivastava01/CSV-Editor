import { INavigationItem, LeftNavigationService } from './../services/left-navigation.service';
import { EuListType } from './../drop-area/drop-area.component';
import { FileService, IFile } from './../../../providers/file.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  clickedNavigationItem: INavigationItem = this.leftNavService.navigationItems[0];

  @Output() openFileItemClicked: EventEmitter<EuListType> = new EventEmitter();
  recentFiles: Array<IFile> = [];

  constructor(private fileService: FileService, private leftNavService: LeftNavigationService) {
    this.leftNavService.activeNavigationItemObservable.subscribe(x => {
      this.clickedNavigationItem = x;
    });
  }

  ngOnInit() {
    this.recentFiles = this.fileService.getRecentSavedFiles();
  }
  readMoreClicked = () => {
    this.leftNavService.LeftNavigationClicked(this.leftNavService.navigationItems.find(x => x.id === 2));
  }

  loadFile(file: IFile) {
    this.fileService.loadFilesInApplication([file]);
  }
  openFileItemClickedHandler = (evt: EuListType) => {
    this.openFileItemClicked.emit(evt);
  }
}
