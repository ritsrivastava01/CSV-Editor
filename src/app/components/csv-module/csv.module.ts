import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvLayoutComponent } from './csv/csv-layout/csv-layout.component';
import { CsvComponent } from './csv/csv.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatTableModule, MatInputModule, MatTabsModule, MatCardModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CsvLayoutComponent, CsvComponent],
  imports: [CommonModule, MatTableModule, MatInputModule, MatTabsModule, FormsModule, MatCardModule, MatButtonModule, TranslateModule, AgGridModule.withComponents([])],
  exports: [CsvComponent]
})
export class CsvModule {}
