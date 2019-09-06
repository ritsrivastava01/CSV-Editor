import { Component, ChangeDetectionStrategy } from '@angular/core';
const shell = require('electron').shell;
@Component({
  selector: 'app-what-we-can-do',
  templateUrl: './what-we-can-do.component.html',
  styleUrls: ['./what-we-can-do.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhatWeCanDoComponent {
  constructor() {}

  /**
   *Open the github URL in new browser
   *
   * @memberof WhatWeCanDoComponent
   */
  openURL = () => shell.openExternal('https://www.ag-grid.com/');
}
