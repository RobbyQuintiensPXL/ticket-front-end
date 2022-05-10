import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../entities/event/event';
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import {faSearchLocation} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event-service/event.service';

@Component({
  selector: 'app-office-events',
  templateUrl: './office-events.component.html',
  styleUrls: ['./office-events.component.css']
})
export class OfficeEventsComponent implements OnInit {
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

  getEventsByOffice(): void {
    this.eventService.getEventsByOffice().subscribe(event => {
      this.events = event;
    });
  }

  ngOnInit(): void {
    this.getEventsByOffice();
  }

}
