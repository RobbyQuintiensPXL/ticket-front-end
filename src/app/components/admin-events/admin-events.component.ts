import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../entities/event/event';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event-service/event.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {numbers} from '@material/banner/constants';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnChanges {

  event: Event;
  events: any;
  closeModal: string;
  @Input() type!: string;
  @Input() location!: string;
  @Input() search!: string;
  @Input() eventName!: string;
  pageSize = 10;
  pageSizeOptions = [3, 5, 10];
  currentPage = 0;

  displayedColumns: string[] = ['Event', 'Type', 'Building', 'Date', 'Time', 'Actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              public router: Router,
              private modalService: NgbModal) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  handlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEvents();
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

  getEvents(eventType?: string, city?: string, search?: string): void {
    const params = this.getParamsTypeCity(this.currentPage, this.pageSize, city, eventType, search);
    this.eventService.getEventsForAdmin(params).subscribe(event =>
        this.events = event.content,
      err => this.events = null
    );
  }

  openModelConfirmApprove(deleteEvent: any){
    this.modalService.open(deleteEvent, {centered: true}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed`;
    });
  }

  approveEvent(id: number, event: Event){
    this.eventService.approveEvent(id, event).subscribe(() => {
      this.getEvents(this.type, this.location, this.search);
      this.modalService.dismissAll();
    });
  }

  ngOnChanges(): void {
    this.getEvents(this.type, this.location, this.search);
  }


}
