import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

