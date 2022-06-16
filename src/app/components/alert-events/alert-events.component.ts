import {Component, Input} from '@angular/core';
import {EventService} from '../../services/event-service/event.service';
import {filter, map, switchMapTo, take} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-alert-events',
  templateUrl: './alert-events.component.html',
  styleUrls: ['./alert-events.component.css']
})
export class AlertEventsComponent {
  private readonly menuOpen$: Subject<boolean> = new Subject<boolean>();
  // private readonly events$: Observable<any> = this.menuOpen$.asObservable().pipe(
  //   filter((isOpen) => isOpen),
  //   switchMapTo(this.eventService.getEventsForAdmin().pipe(take(1)))
  // );
  private readonly events$: Observable<any> = this.eventService.getEventsForAdmin().pipe(take(1));
  readonly eventsContent$: Observable<any> = this.events$.pipe(map(({content}) => content));
  // readonly newEvents$: Observable<number> = this.eventsContent$.pipe(map((content) => content.length));

  readonly newEvents$: Observable<number> = this.eventsContent$.pipe(map((content) => content.length));

  constructor(private eventService: EventService) {
  }

  @Input() set isMenuOpen(toggled: boolean) {
    this.menuOpen$.next(toggled);
  }
}
