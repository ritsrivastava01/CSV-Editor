import { NgModule, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [DashBoardComponent, LeftPanelComponent, RightPanelComponent],
  imports: [CommonModule, SharedModule, MatButtonModule],
  exports: [DashBoardComponent]
})
export class DashBoardNewModule {}
