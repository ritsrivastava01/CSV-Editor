import { Subject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  languages: Array<ILanguage> = [];
  selectedLanguage: ReplaySubject<ILanguage> = new ReplaySubject<ILanguage>();

  constructor(private translateService: TranslateService) {
    this.languages.push(<ILanguage>{ name: 'English', code: 'en' });
    this.languages.push(<ILanguage>{ name: 'Dutch', code: 'nl' });
  }

  changeLanguage = (item: ILanguage) => {
    this.translateService.use(item.code);
    this.storeLanguage(item);
    console.log(this.getStoredLanguage());
  }
  loadDefaultLanguage = () => {
    this.translateService.setDefaultLang(this.languages[0].code);
    this.changeLanguage(this.languages[0]);
  }

  private storeLanguage(language: ILanguage) {
    window.localStorage['languageCode'] = language.code;
    this.selectedLanguage.next(language);
  }

  getStoredLanguage(): ILanguage | null {
    try {
      const code = window.localStorage['languageCode'] || null;
      return code && this.languages.find(x => x.code === code);
    } catch {
      return null;
    }
  }
}

export interface ILanguage {
  name: string;
  code: string;
}
