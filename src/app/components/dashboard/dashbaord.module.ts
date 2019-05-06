import { DashbaordComponent } from './../dashbaord/dashbaord/dashbaord.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftDashboardComponent } from './left-dashboard/left-dashboard.component';
import { RightDashboardComponent } from './right-dashboard/right-dashboard.component';
import { UpperDashboardComponent } from './upper-dashboard/upper-dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashbaordComponent,
    LeftDashboardComponent,
    RightDashboardComponent,
    UpperDashboardComponent
  ],
  exports:
  [
    DashbaordComponent
  ]
})
export class DashbaordModule { }
