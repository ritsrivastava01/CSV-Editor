import { Component, OnInit } from '@angular/core';
import { FileService, IFile } from '../../../providers/file.service';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.scss']
})
export class CsvComponent {

  files: Observable<Array<IFile>> = this.fileService.selectedFiles;
  constructor(public fileService: FileService) { }


}
