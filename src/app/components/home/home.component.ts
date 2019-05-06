import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
const remote = require('electron').remote;
const { dialog } = require('electron').remote;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showDragnDropArea = true;
  constructor() { }

  ngOnInit() {
    localStorage.setItem('file 1', 'C://programefiles/test1.txt');
    console.log(localStorage.getItem('file 1'));
  }

}

