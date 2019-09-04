import { INavigationItem, LeftNavigationService } from './../services/left-navigation.service';

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {
  navigationItemList: INavigationItem[] = [];

  constructor(private leftNavService: LeftNavigationService) {
    this.leftNavService.navigationItemsObservable.subscribe(x => {
      this.navigationItemList = x;
    });

    this.leftNavService.LeftNavigationClicked(this.leftNavService.navigationItems[0]);
  }

  activateNavigationItem = (navigationItem: INavigationItem) => {
    this.leftNavService.LeftNavigationClicked(navigationItem);
  }
}
