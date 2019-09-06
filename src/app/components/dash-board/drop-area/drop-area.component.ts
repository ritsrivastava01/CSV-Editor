import { IFile, FileService } from './../../../providers/file.service';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as path from 'path';

export enum EuListType {
  OPEN_FOLDER = 'openFile',
  OPEN_FILE = 'multiSelections',
  DRAG_AND_DROP = 'dragDrop'
}

@Component({
  selector: 'app-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: ['./drop-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropAreaComponent implements OnInit {
  eListType = EuListType;

  files: Array<IFile> = [];
  value = 20;
  constructor(private changeDetectorRef: ChangeDetectorRef, private fileService: FileService) {}

  ngOnInit() {
    this.fileDropped();
  }

  /**
   * Open the upload file popup
   *
   * @memberof DropAreaComponent
   */
  uploadButtonClickedHandler = (eve: EuListType) => {
    switch (eve) {
      case EuListType.OPEN_FILE:
        this.fileService.showDialog(false);
        break;
      case EuListType.OPEN_FOLDER:
        this.fileService.showDialog(true);
        break;
    }
  }

  /**
   *File Dropped handler
   *
   * @memberof DropAreaComponent
   */
  fileDropped = () => {
    const holder = document.getElementById('drag-file');
    holder.ondragover = (e: any) => {
      e.target.classList.add('box-drag-over');
      return false;
    };

    holder.ondragleave = (e: any) => {
      e.target.classList.remove('box-drag-over');
      return false;
    };
    holder.ondragend = () => {
      return false;
    };

    holder.ondrop = (e: any) => {
      e.preventDefault();
      const fileList: File[] = Array.from(e.dataTransfer.files);
      if (fileList.length <= 5) {
        this.files = fileList
          .filter((x: File) => path.extname(x.path) === '.csv')
          .map((y: File) => {
            this.changeDetectorRef.detectChanges();
            return <IFile>{
              fileName: y.name,
              filePath: y.path
            };
          });
        this.fileService.loadFilesInApplication(this.files);
        return false;
      } else {
        alert('CSV Editor can support 5 files maximum at a time');
        return false;
      }
    };
  }
}
