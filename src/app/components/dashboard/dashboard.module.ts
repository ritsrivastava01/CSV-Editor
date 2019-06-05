
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftDashboardComponent } from './left-dashboard/left-dashboard.component';
import { RightDashboardComponent } from './right-dashboard/right-dashboard.component';
import { UpperDashboardComponent } from './upper-dashboard/upper-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {

  MatDividerModule,
        } from '@angular/material';
@NgModule({
  declarations: [
    DashboardComponent,
    LeftDashboardComponent,
    RightDashboardComponent,
    UpperDashboardComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule
  ],
  exports:
    [
      DashboardComponent
    ]
})
export class DashboardModule { }
