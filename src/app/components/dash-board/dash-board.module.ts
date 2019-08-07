import { NgModule, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import { DropAreaComponent } from './drop-area/drop-area.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    LeftPanelComponent,
    RightPanelComponent,
    DropAreaComponent,
    ContactUsComponent
  ],
  imports: [CommonModule, SharedModule, MatButtonModule, MatProgressBarModule],
  exports: [DashBoardComponent]
})
export class DashBoardNewModule {}
