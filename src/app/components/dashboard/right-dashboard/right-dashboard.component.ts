import { FileService, IFile } from './../../../providers/file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-dashboard',
  templateUrl: './right-dashboard.component.html',
  styleUrls: ['./right-dashboard.component.scss']
})
export class RightDashboardComponent implements OnInit {
  recentFiles: Array<IFile> = [];
  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.recentFiles = this.fileService.getRecentSavedFiles();
  }

  loadFile(file: IFile) {
    this.fileService.loadFilesInApplication([file]);
  }
}
