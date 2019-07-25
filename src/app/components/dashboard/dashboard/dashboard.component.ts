import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EuListType } from '../left-dashboard/left-dashboard.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() leftListItemClicked: EventEmitter<EuListType> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  listItemClickedHandler = (evt: EuListType) => {
    this.leftListItemClicked.emit(evt);
  }
}
