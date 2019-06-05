
import { map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DocsSiteTheme, ThemeStorage } from './theme-storge/theme-storage';
import { StyleManager } from './style-manager/style-manager';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'aria-hidden': 'true'},
})
export class ThemePickerComponent implements OnInit {

  private _queryParamSubscription = Subscription.EMPTY;
  currentTheme: DocsSiteTheme;

  themes: DocsSiteTheme[] = [
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'deeppurple-amber',
      isDark: false,
    },
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    }
    // ,
    // {
    //   primary: '#E91E63',
    //   accent: '#607D8B',
    //   name: 'pink-bluegrey',
    //   isDark: false,
    // },
    // {
    //   primary: '#9C27B0',
    //   accent: '#4CAF50',
    //   name: 'purple-green',
    //   isDark: false,
    // },
  ];

  constructor(
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage,
    private _activatedRoute: ActivatedRoute) {
    this.installTheme(this._themeStorage.getStoredThemeName());
  }

  ngOnInit() {
    console.log(this.styleManager.getExistingLinkElementByKey('deeppurple-amber'));
    this._queryParamSubscription = this._activatedRoute.queryParamMap
      .pipe(map(params => params.get('theme')), filter(Boolean))
      .subscribe(themeName => this.installTheme(themeName));
  }

  installTheme(themeName: string) {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    this.styleManager.setStyle('theme', `assets/custom-themes/${theme.name}.css`);

    // if (theme.isDefault) {
    //   this.styleManager.removeStyle('theme');
    // } else {
    //   this.styleManager.setStyle('theme', `assets/custom-theme/${theme.name}.css`);
    // }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

}
