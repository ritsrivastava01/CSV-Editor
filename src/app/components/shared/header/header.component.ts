import { FileService } from './../../../providers/file.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Array<ILanguage> = [];
  selectedLanguage = 'English';
  @Output() goToHomeClicked = new EventEmitter();

  constructor(
    private translateService: TranslateService,
    private fileService: FileService
  ) {}

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

  clicked = () => {
    this.goToHomeClicked.emit();
  }
  uploadCsvClicked = () => {
    this.fileService.showDialog();
  }
}

export interface ILanguage {
  name: string;
  code: string;
}
