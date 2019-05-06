import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-area',
  templateUrl: './drop-area.component.html',
  styleUrls: ['./drop-area.component.scss']
})
export class DropAreaComponent implements OnInit {

  @Output() cancelClicked: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  cancelClick = () => {
    this.cancelClicked.emit(true);
  }

}
