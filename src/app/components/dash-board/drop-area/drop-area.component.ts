import { IFile, FileService } from './../../../providers/file.service';

import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import * as path from 'path';
export enum EuListType {
  OPEN_FOLDER = 'openFile',
  OPEN_FILE = 'multiSelections',
  DRAG_AND_DROP = 'dragDrop'
}

@Component({
  selector: 'app-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: ['./drop-area.component.scss']
})
export class DropAreaComponent implements OnInit {
  @Output() OpenFileItemClicked: EventEmitter<EuListType> = new EventEmitter();
  eListType = EuListType;

  files: Array<IFile> = [];
  value = 20;
  constructor(private changeDetectorRef: ChangeDetectorRef, private fileService: FileService) {}

  buttonClickedHandler = (eve: EuListType) => {
    this.OpenFileItemClicked.emit(eve);
  }

  ngOnInit() {
    this.fileDropped();
  }

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

    // holder.addEventListener('dragenter', function(event) {
    //     event.target.style.border = '3px dotted red';
    // });

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
