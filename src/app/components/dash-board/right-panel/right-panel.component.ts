import { LanguageService, ILanguage } from './../../../providers/language.service';
import { INavigationItem, LeftNavigationService } from './../services/left-navigation.service';
import { EuListType } from './../drop-area/drop-area.component';
import { FileService, IFile } from './../../../providers/file.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  clickedNavigationItem: INavigationItem = this.leftNavService.navigationItems[0];

  @Output() openFileItemClicked: EventEmitter<EuListType> = new EventEmitter();
  recentFiles: Array<IFile> = [];
  languages: Array<ILanguage> = [];
  selectedLanguage: ILanguage;

  constructor(private fileService: FileService, private leftNavService: LeftNavigationService, private languageService: LanguageService) {
    this.leftNavService.activeNavigationItemObservable.subscribe(x => {
      this.clickedNavigationItem = x;
    });
  }

  ngOnInit() {
    this.recentFiles = this.fileService.getRecentSavedFiles();
    this.languages = this.languageService.languages;
    this.languageService.selectedLanguage.subscribe(x => {
      console.log(x);
      this.selectedLanguage = x;
    });
  }

  /**
   * Click handler for 'read more'
   *
   * @memberof RightPanelComponent
   */
  readMoreClicked = () => {
    this.leftNavService.LeftNavigationClicked(this.leftNavService.navigationItems.find(x => x.id === 2));
  }

  /**
   *Load file in application
   *
   * @memberof RightPanelComponent
   */
  loadFile = (file: IFile) => this.fileService.loadFilesInApplication([file]);

  /**
   * language change handler
   * @param  {ILanguage} item
   */
  changeLanguage = (language: ILanguage) => this.languageService.changeLanguage(language);
}
