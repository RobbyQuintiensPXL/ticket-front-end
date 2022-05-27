import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-office-home',
  templateUrl: './office-home.component.html',
  styleUrls: ['./office-home.component.css']
})
export class OfficeHomeComponent implements OnInit {

  msgType: any;
  msgLocation: any;
  msgSearch: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  addSearch(search: string) {
    this.msgSearch = search;
    console.log(this.msgType);
  }

  addType(type: string) {
    this.msgType = type;
    console.log(this.msgType);
  }

  addLocation(location: string) {
    this.msgLocation = location;
    console.log(this.msgLocation);
  }

}
