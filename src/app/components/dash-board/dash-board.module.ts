import { TranslateModule } from '@ngx-translate/core';
import { NgModule, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatProgressBarModule, MatGridListModule, MatMenuModule } from '@angular/material';
import { DropAreaComponent } from './drop-area/drop-area.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LeftNavigationService } from './services/left-navigation.service';
import { WhatWeCanDoComponent } from './what-we-can-do/what-we-can-do.component';

@NgModule({
  declarations: [DashBoardComponent, LeftPanelComponent, RightPanelComponent, DropAreaComponent, ContactUsComponent, WhatWeCanDoComponent],
  imports: [CommonModule, SharedModule, MatButtonModule, MatProgressBarModule, MatGridListModule, TranslateModule, MatMenuModule],
  exports: [DashBoardComponent],
  providers: [LeftNavigationService]
})
export class DashBoardNewModule {}
