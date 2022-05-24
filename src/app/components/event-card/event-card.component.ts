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
  typeString: string;
  cityString: string;
  pageSize = 5;
  pageSizeOptions = [3, 5, 10];
  currentPage = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              public router: Router) {
    this.typeString = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.cityString = this.activatedRoute.snapshot.queryParamMap.get('city');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  handlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEvents();
  }

  getParams(page: number, size?: number) {
    const params: any = {};
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
    this.eventService.getEvents(params).subscribe(event =>
      this.events = event.content);
  }

  getEventsByType(type: string): void {
    this.eventService.getEventsByType(type).subscribe(event => {
      this.events = event;
    });
  }

  getEventsByTypeAndCity(type: string, city: string): void {
    this.eventService.getEventsByTypeAndCity(type, city).subscribe(event => {
      this.events = event;
    });
  }

  ngOnChanges(): void {
    this.typeString = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.cityString = this.activatedRoute.snapshot.queryParamMap.get('city');
    if ((this.typeString === 'all' || this.cityString === 'all') || (this.typeString == null || this.cityString == null)) {
      this.getEvents();
    } else {
      this.getEventsByTypeAndCity(this.typeString, this.cityString);
    }
  }
}
