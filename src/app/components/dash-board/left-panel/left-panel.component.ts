import { INavigationItem, LeftNavigationService } from './../services/left-navigation.service';

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftPanelComponent {
  navigationItemList: INavigationItem[] = [];

  constructor(private leftNavService: LeftNavigationService) {
    this.leftNavService.navigationItemsObservable.subscribe(x => {
      this.navigationItemList = x;
    });

    this.leftNavService.LeftNavigationClicked(this.leftNavService.navigationItems[0]);
  }

  /**
   *Click handler for navigation
   *
   * @memberof LeftPanelComponent
   */
  clickItem = (navigationItem: INavigationItem) => {
    this.leftNavService.LeftNavigationClicked(navigationItem);
  }
}
