import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.css']
})
export class OfficeHomeComponent implements OnInit {

  currentMsgFromChild1ToChild2: any;

  constructor() {
  }

  fwdMsgToSib2($event) {
    this.currentMsgFromChild1ToChild2 = $event;
  }


  ngOnInit(): void {
  }

}
