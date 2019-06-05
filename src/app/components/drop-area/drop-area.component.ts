import { FileService } from './../../providers/file.service';
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IFile } from '../../providers/file.service';
import * as path from 'path';

@Component({
  selector: 'app-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: ['./drop-area.component.scss']
})
export class DropAreaComponent implements OnInit {

  @Output() cancelClicked: EventEmitter<boolean> = new EventEmitter();
  files: Array<IFile> = [];
  value = 20;
  constructor(private changeDetectorRef: ChangeDetectorRef, private fileService: FileService) {

  }

  ngOnInit() {
    this.fileDropped();
  }
  cancelClick = () => {
    this.cancelClicked.emit(true);
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
      this.files = fileList.filter((x: File) => path.extname(x.path) === '.csv').map((y: File) => {
        this.changeDetectorRef.detectChanges();
        return <IFile>{
          fileName: y.name,
          filePath: y.path
        };
      });
      this.fileService.loadFilesInApplication(this.files);
      //this.fileService.loadDataFromCSV(this.files[0]);
      return false;
    };
  }
}
