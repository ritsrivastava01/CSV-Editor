import { FileService } from './../../providers/file.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Array<ILanguage> = [];
  selectedLanguage = 'English';
  constructor(private translateService: TranslateService, private fileService: FileService) { }

  ngOnInit() {
    this.languages.push(<ILanguage>{ name: 'English', code: 'en' });
    this.languages.push(<ILanguage>{ name: 'Dutch', code: 'nl' });
  }

  /**
  * language change handler
  * @param  {ILanguage} item
  */
  changeLanguage = (item: ILanguage) => {
    this.selectedLanguage = item.name;
    this.translateService.use(item.code);
  }

  uploadCsvClicked = () => {
    this.fileService.showDialog();
  }
}



export interface ILanguage {
  name: string;
  code: string;
}