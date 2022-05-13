import { Component, OnInit } from '@angular/core';
import {Event} from '../../entities/event/event';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../../services/event-service/event.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.css']
})
export class EventHeaderComponent implements OnInit {
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
