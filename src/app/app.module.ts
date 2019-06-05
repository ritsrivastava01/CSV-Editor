
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
         MatNativeDateModule,
         MatTabsModule,
         MatToolbarModule,
         MatButtonModule,
         MatSidenavModule,
         MatGridListModule,
         MatListModule,
         MatIconModule,
         MatProgressBarModule,
         MatMenuModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { FooterComponent } from './components/footer/footer.component';
import { DropAreaComponent } from './components/drop-area/drop-area.component';
import { FileService } from './providers/file.service'
import { CsvModule } from './components/csv-module/csv.module';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { StyleManager } from './components/theme-picker/style-manager/style-manager';
import { ThemeStorage } from './components/theme-picker/theme-storge/theme-storage';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    HeaderComponent,
    FooterComponent,
    DropAreaComponent,
    ThemePickerComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    DragDropModule,
    MatTabsModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CsvModule,
    DashboardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatGridListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, FileService, StyleManager, ThemeStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
