import { EuListType } from './drop-area/drop-area.component';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent {
  @Output() openFileItemClicked: EventEmitter<EuListType> = new EventEmitter();
  constructor() {}

  openFileItemClickedHandler = (evt: EuListType) => {
    this.openFileItemClicked.emit(evt);
  }
}
