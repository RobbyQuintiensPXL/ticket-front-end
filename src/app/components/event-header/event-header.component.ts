import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../entities/event/event';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.css']
})
export class EventHeaderComponent implements OnInit {

  @Input() event: Event;

  constructor() {
  }

  ngOnInit(): void {
  }

}
