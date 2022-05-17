import {Component, Input, OnInit, Output} from '@angular/core';
import {Event} from '../../entities/event/event';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event-service/event.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['./event-detail-page.component.css']
})
export class EventDetailPageComponent implements OnInit {
  @Input() orderTrueOutput: boolean;

  event: Event;
  id: any;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  getEventById(id: number): Subscription {
    return this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
    });
  }

  ngOnInit(): void {
    this.getEventById(this.id);
  }

}
