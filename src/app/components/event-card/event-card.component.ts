import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {Event} from '../../entities/event/event';
import {EventService} from '../../services/event-service/event.service';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnChanges {

  event: Event;
  events: any;
  faSearchLocation = faSearchLocation;
  faCalenderAlt = faCalendarAlt;
  @Input() type!: string;
  @Input() location!: string;
  @Input() search!: string;
  pageSize = 10;
  pageSizeOptions = [3, 5, 10];
  currentPage = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              public router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  handlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEvents();
  }

  // tslint:disable-next-line:variable-name
  getParams(page: number, size?: number, search?: string, location_city?: string, eventType?: string) {
    const params: any = {};
    if (search) {
      params.search = search;
    }
    if (page) {
      params.page = page;
    }
    if (size) {
      params.size = size;
    }
    if (location_city) {
      params.location_city = location_city;
    }
    if (eventType) {
      params.eventType = eventType;
    }
    return params;
  }

  // tslint:disable-next-line:variable-name
  getParamsTypeCity(page: number, size?: number, location_city?: string, eventType?: string) {
    const params: any = {};
    if (location_city) {
      params.location_city = location_city;
    }
    if (eventType) {
      params.eventType = eventType.toUpperCase();
    }
    if (page) {
      params.page = page;
    }
    if (size) {
      params.size = size;
    }
    return params;
  }

  getEvents(): void {
    const params = this.getParams(this.currentPage, this.pageSize);
    this.eventService.getEventsBySearchTerm(params).subscribe(event =>
      this.events = event.content);
  }

  getEventsByTypeAndOrCity(eventType?: string, city?: string): void {
    const params = this.getParamsTypeCity(this.currentPage, this.pageSize, city, eventType);
    console.log(params);
    this.eventService.getEventsByTypeAndOrCity(params).subscribe(event =>
      this.events = event.content);
  }

  getEventsBySearchterm(search: string) {
    const params = this.getParams(this.currentPage, this.pageSize, search);
    console.log(params);
    this.eventService.getEventsBySearchTerm(params).subscribe(event =>
      this.events = event.content);
  }

  ngOnChanges(): void {
    if (this.search == null || this.search === ' ') {
      this.getEventsByTypeAndOrCity(this.type, this.location);
    } else {
      this.getEventsBySearchterm(this.search);
    }
  }
}
