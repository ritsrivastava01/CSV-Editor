import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upper-dashboard',
  templateUrl: './upper-dashboard.component.html',
  styleUrls: ['./upper-dashboard.component.scss']
})
export class UpperDashboardComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  ngOnInit() {
    this.myStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      'z-index': -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    this.myParams = {
      'particles': {
        'number': {
          'value': 200
        },
        'color': {
          'value': '#ff0000'
        },
        'shape': {
          'type': 'triangle'
        }
      }
    };
  }
}
