import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {EventTypeService} from '../../services/event-type/event-type.service';

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.css']
})
export class FilterTypeComponent implements OnInit {
  @Output() typeOutput = new EventEmitter<any>();
  eventTypes: string[];
  eventType: string;

  constructor(private eventTypeService: EventTypeService) {
  }

  listAllEventTypes(): void {
    this.eventTypeService.getEventTypes().subscribe(eventType => {
      this.eventTypes = eventType;
    });
  }

  msgType(type: string) {
    this.typeOutput.emit(type = this.eventType);
  }

  ngOnInit(): void {
    this.listAllEventTypes();
  }

}
