import { LanguageService, ILanguage } from './../../../providers/language.service';

import { FileService } from './../../../providers/file.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
const shell = require('electron').shell;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Array<ILanguage> = [];
  selectedLanguage: ILanguage;
  @Output() goToHomeClicked = new EventEmitter();

  constructor(private translateService: TranslateService, private fileService: FileService, private languageService: LanguageService) {}

  ngOnInit() {
    this.languages = this.languageService.languages;
    this.languageService.selectedLanguage.subscribe(x => {
      this.selectedLanguage = x;
    });
  }
  openURL() {
    shell.openExternal('https://github.com/ritsrivastava01/CSV-Editor');
  }

  /**
   * language change handler
   * @param  {ILanguage} item
   */
  changeLanguage = (language: ILanguage) => {
    this.languageService.changeLanguage(language);
  }

  clicked = () => {
    this.goToHomeClicked.emit();
  }
  uploadCsvClicked = () => {
    this.fileService.showDialog();
  }
}
