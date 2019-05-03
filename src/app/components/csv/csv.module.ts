import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvLayoutComponent } from './csv-layout/csv-layout.component';
import { CsvHeaderComponent } from './csv-header/csv-header.component';
import { CsvComponent } from './csv/csv.component';
import { FormsModule } from '@angular/forms';
import {
          MatTableModule,
          MatInputModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatTabsModule,
          MatToolbarModule,
          MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    CsvLayoutComponent,
    CsvHeaderComponent,
    CsvComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    FormsModule
  ],
  exports: [
    CsvComponent
  ]
})
export class CsvModule { }
