import { EuListType } from './drop-area/drop-area.component';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  navigationItems: INavigationItem[] = [];
  clickedNavigationItem: INavigationItem;
  @Output() opneFileItemClicked: EventEmitter<EuListType> = new EventEmitter();
  constructor(private cdf: ChangeDetectorRef) {}

  ngOnInit() {
    this.navigationItems.push({ id: 1, label: 'Welcome', isActive: true });
    this.navigationItems.push({
      id: 2,
      label: 'What we do',
      isActive: false
    });
    this.navigationItems.push({
      id: 3,
      label: 'Upload Files',
      isActive: false
    });
    this.navigationItems.push({
      id: 4,
      label: 'Get in toutch',
      isActive: false
    });
    this.clickedNavigationItem = this.navigationItems[3];
    this.cdf.detectChanges();
  }

  navigationItemClickedHandler = (e: INavigationItem) =>
    (this.clickedNavigationItem = e)

  onNavigationItemClicked = (navigatiohnItem: INavigationItem) => {
    this.navigationItems.map(x => {
      x.isActive = x.id === navigatiohnItem.id ? true : false;
    });
  }

  opneFileItemClickedHandler = (evt: EuListType) => {
    this.opneFileItemClicked.emit(evt);
  }
}

export interface INavigationItem {
  id: number;
  label: string;
  isActive: boolean;
}
