import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentMsgFromChild1ToChild2: any;

  constructor() { }

  fwdMsgToSib2($event) { this.currentMsgFromChild1ToChild2 = $event; }

  ngOnInit(): void {
  }

}
