import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msgEvent: any;
  msgLocation: any;

  constructor() { }

  fwdEvent($event) { this.msgEvent = $event; }
  fwdLocation($event) { this.msgLocation = $event; }

  ngOnInit(): void {
  }

}
