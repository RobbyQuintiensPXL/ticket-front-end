import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() searchOutputEvent = new EventEmitter<string>();

  constructor() {
  }

  getSearch(event) {
    this.searchOutputEvent.emit(event.target.value);
  }

  ngOnInit(): void {

  }

}
