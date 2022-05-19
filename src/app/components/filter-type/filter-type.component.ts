import {Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef} from '@angular/core';
import {EventTypeService} from '../../services/event-type/event-type.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.css']
})
export class FilterTypeComponent implements OnInit {
  @Output() typeOutput = new EventEmitter<any>();
  eventTypes: string[];
  eventType: string;
  selectedType: any;

  constructor(private eventTypeService: EventTypeService,
              private router: Router) {
  }
  @ViewChild('typeSelect') el: ElementRef;

  listAllEventTypes(): void {
    this.eventTypeService.getEventTypes().subscribe(eventType => {
      this.eventTypes = eventType;
    });
  }

  typeSelected(event: any){
    this.selectedType = event.target.value;
    this.router.navigate(['../search'], {queryParams: {type: this.selectedType}});
    this.el.nativeElement.value = this.selectedType;
  }

  ngOnInit(): void {
    this.listAllEventTypes();
  }

}
