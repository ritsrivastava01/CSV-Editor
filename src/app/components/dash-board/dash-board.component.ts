import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashBoardComponent {
  constructor() {}
}
