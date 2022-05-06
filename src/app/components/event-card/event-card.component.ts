import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../entities/event/event';
import {EventService} from '../../services/event-service/event.service';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import {Observable} from 'rxjs';
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
  typeString: string;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              public router: Router) {
    this.typeString = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
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

  ngOnChanges(): void {
    this.typeString = this.activatedRoute.snapshot.queryParamMap.get('type');
    if (this.typeString === 'all') {
      this.getEvents();
    } else {
      this.getEventsByType(this.typeString);
    }
  }

}
