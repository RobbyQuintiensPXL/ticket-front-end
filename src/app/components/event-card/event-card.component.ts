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
  @Input() eventName!: string;
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
    this.getEventsByTypeAndOrCity();
  }

  getEvents(): void {
    const params = this.getParamsTypeCity(this.currentPage, this.pageSize);
    this.eventService.getEvents(params).subscribe(event =>
      this.events = event.content);
  }

  getParamsTypeCity(page: number, size?: number, locationCity?: string, eventType?: string, eventName?: string) {
    const params: any = {};
    if (locationCity) {
      params.location_city = locationCity;
    }
    if (eventType) {
      params.eventType = eventType.toUpperCase();
    }
    if (eventName) {
      params.eventName = eventName;
    }
    if (page) {
      params.page = page;
    }
    if (size) {
      params.size = size;
    }
    return params;
  }

  getEventsByTypeAndOrCity(eventType?: string, city?: string, search?: string): void {
    const params = this.getParamsTypeCity(this.currentPage, this.pageSize, city, eventType, search);
    console.log(params);
    this.eventService.getEventsByTypeAndOrCityAndOrEventName(params).subscribe(event =>
      this.events = event.content,
      err => this.events = null
    );
  }

  ngOnChanges(): void {
    this.getEventsByTypeAndOrCity(this.type, this.location, this.search);
  }
}
