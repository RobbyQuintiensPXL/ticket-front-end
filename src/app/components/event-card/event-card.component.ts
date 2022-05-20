import {Component, Input, OnChanges} from '@angular/core';
import {Event} from '../../entities/event/event';
import {EventService} from '../../services/event-service/event.service';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnChanges {

  event: Event;
  events: Event[];
  faSearchLocation = faSearchLocation;
  faCalenderAlt = faCalendarAlt;
  @Input() type!: string;
  @Input() location!: string;
  typeString: string;
  cityString: string;
  locationString: string;
  private obs$: number;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              public router: Router) {
    this.typeString = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.cityString = this.activatedRoute.snapshot.queryParamMap.get('city');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(event => {
      this.events = event;
    });
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
    console.log(this.typeString);
    console.log(this.cityString);
    if (this.typeString === 'all') {
      this.getEvents();
    } else {
      this.getEventsByTypeAndCity(this.typeString, this.cityString);
    }
  }


}
