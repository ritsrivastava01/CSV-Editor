import { LanguageService, ILanguage } from './../../../providers/language.service';
import { FileService } from './../../../providers/file.service';
import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
const shell = require('electron').shell;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  /**
   *Open the github URL
   *
   * @memberof HeaderComponent
   */
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

  /**
   *HomeClick handler navigate to home
   *
   * @memberof HeaderComponent
   */
  homeClicked = () => this.goToHomeClicked.emit();

  /**
   *Used to open the select file dialog
   *
   * @memberof HeaderComponent
   */
  uploadCsvClicked = () => this.fileService.showDialog();
}
