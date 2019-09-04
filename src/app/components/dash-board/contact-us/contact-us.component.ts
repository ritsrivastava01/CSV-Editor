import { Component, OnInit } from '@angular/core';
const shell = require('electron').shell;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  openURL() {
    shell.openExternal('https://github.com/ritsrivastava01/CSV-Editor');
  }
}
