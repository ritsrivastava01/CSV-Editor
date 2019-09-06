import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
const shell = require('electron').shell;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactUsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  /**
   * Open the Github url in new window
   *
   * @memberof ContactUsComponent
   */
  openURL() {
    shell.openExternal('https://github.com/ritsrivastava01/CSV-Editor');
  }
}
