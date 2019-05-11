import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsvComponent } from './csv/csv.component';



const routes: Routes = [
  {
    path: '',
    component: CsvComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvRoutingModule { }
