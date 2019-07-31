import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  navigationItems: INavigationItem[] = [];
  clickedNavigationItem: INavigationItem;

  constructor(private cdf: ChangeDetectorRef) {}

  ngOnInit() {
    this.navigationItems.push({ id: 1, label: 'Welcome', isActive: true });
    this.navigationItems.push({
      id: 2,
      label: 'Who we are',
      isActive: false
    });
    this.navigationItems.push({
      id: 3,
      label: 'What we do',
      isActive: false
    });
    this.navigationItems.push({
      id: 4,
      label: 'Get in toutch',
      isActive: false
    });
    this.clickedNavigationItem = this.navigationItems[0];
    this.cdf.detectChanges();
  }

  navigationItemClickedHandler = (e: INavigationItem) =>
    (this.clickedNavigationItem = e)

  onNavigationItemClicked = (navigatiohnItem: INavigationItem) => {
    this.navigationItems.map(x => {
      x.isActive = x.id === navigatiohnItem.id ? true : false;
    });
  }
}

export interface INavigationItem {
  id: number;
  label: string;
  isActive: boolean;
}
