import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvLayoutComponent } from './csv/csv-layout/csv-layout.component';
import { CsvHeaderComponent } from './csv/csv-header/csv-header.component';
import { CsvComponent } from './csv/csv.component';
import { FormsModule } from '@angular/forms';
import {
  MatTableModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatPaginatorModule
} from '@angular/material';



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
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  exports: [
    CsvComponent
  ]
})
export class CsvModule { }
