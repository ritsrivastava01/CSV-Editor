import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvLayoutComponent } from './csv/csv-layout/csv-layout.component';
import { CsvHeaderComponent } from './csv/csv-header/csv-header.component';
import { CsvComponent } from './csv/csv.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {
  MatTableModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatPaginatorModule,
  MatButtonModule
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
    MatButtonModule,
    MatPaginatorModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    CsvComponent
  ]
})
export class CsvModule { }
