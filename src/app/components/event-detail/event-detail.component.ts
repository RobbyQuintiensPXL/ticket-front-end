import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event-service/event.service';
import {Event} from '../../entities/event/event';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ImageService} from '../../services/image-service/image.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: any;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private imageService: ImageService) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }


  getEventById(id: number): Subscription{
    return this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
    });
  }

  ngOnInit(): void {
    this.getEventById(this.id);
  }

}
