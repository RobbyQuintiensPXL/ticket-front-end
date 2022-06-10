import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map, shareReplay, switchMapTo, take} from 'rxjs/operators';
import {EventService} from '../../services/event-service/event.service';

@Component({
  selector: 'app-alert-events',
  templateUrl: './alert-events.component.html',
  styleUrls: ['./alert-events.component.css']
})
export class AlertEventsComponent {
  private readonly menuOpen$: Subject<boolean> = new Subject<boolean>();
  private readonly events$: Observable<any> = this.menuOpen$.asObservable().pipe(
    filter((isOpen) => isOpen),
    switchMapTo(this.eventService.getEventsForAdmin().pipe(take(1)))
  );
  readonly eventsContent$: Observable<any> = this.events$.pipe(map(({content}) => content));
  readonly newEvents$: Observable<number> = this.eventsContent$.pipe(map((content) => content.length));

  constructor(private eventService: EventService) {
  }

  @Input() set isMenuOpen(toggled: boolean) {
    this.menuOpen$.next(toggled);
  }
}
