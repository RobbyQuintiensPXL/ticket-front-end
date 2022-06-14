import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {Event} from '../../entities/event/event';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event-service/event.service';
import {MatPaginator} from '@angular/material/paginator';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TicketService} from '../../services/ticket-service/ticket.service';

@Component({
  selector: 'app-office-events',
  templateUrl: './office-events.component.html',
  styleUrls: ['./office-events.component.css']
})

export class OfficeEventsComponent implements OnChanges {

  event: Event;
  events: any;
  @Input() type!: string;
  @Input() location!: string;
  @Input() search!: string;
  @Input() eventName!: string;
  pageSize = 10;
  pageSizeOptions = [3, 5, 10];
  currentPage = 0;

  displayedColumns: string[] = ['Event', 'Type', 'Date', 'Time', 'Accepted', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private ticketService: TicketService,
              public router: Router,
              private modalService: NgbModal) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  handlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEventsByOffice();
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

  getEventsByOffice(eventType?: string, city?: string, search?: string): void {
    const params = this.getParamsTypeCity(this.currentPage, this.pageSize, city, eventType, search);
    this.eventService.getEventsByOffice(params).subscribe(event =>
        this.events = event.content,
      err => this.events = null
    );
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.getEventsByOffice(this.type, this.location, this.search);
      this.modalService.dismissAll();
    });
  }

  ngOnChanges(): void {
    this.getEventsByOffice(this.type, this.location, this.search);
  }
}
