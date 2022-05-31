import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

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
