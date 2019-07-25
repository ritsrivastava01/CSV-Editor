import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileService, IFile } from '../../../providers/file.service';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent {

  files: Observable<Array<IFile>> = this.fileService.selectedFiles;
  @Output() gridEdited:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(public fileService: FileService) { }

  isGridEdited(evt: any) {
    console.log(evt);
    this.gridEdited.emit(evt);
  }
}
