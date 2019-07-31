import { InitialNavigation } from '@angular/router/src/router_module';
import { INavigationItem } from './../dash-board.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent {
  @Input() navigationItemList: INavigationItem[] = [];
  @Output() navigationItemClicked: EventEmitter<
    INavigationItem
  > = new EventEmitter<INavigationItem>();

  constructor() {}

  activateNavigationItem = (navigatiohnItem: INavigationItem) => {
    this.navigationItemList.map(x => {
      x.isActive = x.id === navigatiohnItem.id ? true : false;
    });

    this.navigationItemClicked.emit(
      this.navigationItemList.find(x => x.isActive)
    );
  }
}
