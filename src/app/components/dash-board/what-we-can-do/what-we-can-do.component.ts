import { Component } from '@angular/core';
const shell = require('electron').shell;
@Component({
  selector: 'app-what-we-can-do',
  templateUrl: './what-we-can-do.component.html',
  styleUrls: ['./what-we-can-do.component.scss']
})
export class WhatWeCanDoComponent {
  constructor() {}

  openURL() {
    shell.openExternal('https://www.ag-grid.com/');
  }
}
