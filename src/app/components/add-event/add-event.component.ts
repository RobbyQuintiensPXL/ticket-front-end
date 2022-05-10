import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeService} from '../../services/event-type/event-type.service';
import {LocationService} from '../../services/location-service/location.service';
import {Location} from '../../entities/location/location';
import {EventService} from '../../services/event-service/event.service';
import {Event} from '../../entities/event/event';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  isLinear = true;
  filePathBanner: string;
  filePathThumb: string;
  event: Event;
  locations: Location[];
  location: Location;
  newLocation: Location;
  eventTypes: string[];
  eventType: string;
  email: string;
  eventInfoGroup: FormGroup;
  eventDescriptionGroup: FormGroup;
  eventTicketGroup: FormGroup;
  locationModalForm: FormGroup;
  closeModal: string;
  eventFormData: any;
  bannerFile: any;
  thumbFile: any;

  constructor(private formBuilder: FormBuilder,
              private eventTypeService: EventTypeService,
              private locationService: LocationService,
              private eventService: EventService,
              private modalService: NgbModal) {
  }

  imagePreview(e, group) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    if (group.includes('bannergroup')) {
      this.eventInfoGroup.patchValue({
        img: file
      });
      reader.onload = () => {
        this.filePathBanner = reader.result as string;
      };
      this.eventInfoGroup.get('img').updateValueAndValidity();
      this.bannerFile = file;
    } else {
      this.eventInfoGroup.patchValue({
        img: file
      });
      reader.onload = () => {
        this.filePathThumb = reader.result as string;
      };
      this.eventInfoGroup.get('img').updateValueAndValidity();
      this.thumbFile = file;
    }
    reader.readAsDataURL(file);
    console.log(file);
  }

  listEventTypes(): void {
    this.eventTypeService.getEventTypes().subscribe(eventType => {
      this.eventTypes = eventType;
    });
  }

  listLocation(): void {
    this.locationService.getLocationsByTicketOffice().subscribe(location => {
      this.locations = location;
    });
  }

  createEvent(): void {
    this.eventFormData = {
      eventName: this.eventInfoGroup.value.nameEvent,
      eventType: this.eventInfoGroup.value.eventType,
      location: this.eventInfoGroup.value.eventLocation,
      eventTime: this.eventTicketGroup.value.time,
      eventDate: this.eventTicketGroup.value.date,
      shortDescription: this.eventDescriptionGroup.value.shortDescription,
      description: this.eventDescriptionGroup.value.fullDescription,
      price: this.eventTicketGroup.value.price,
      ticketsLeft: this.eventTicketGroup.value.amountOfTickets,
    };
  }

  ngOnInit() {
    this.locationModalForm = this.formBuilder.group({
      buildingName: [null],
      locationStreet: [null],
      locationZip: [null],
      locationCity: [null],
      locationCountry: [null],
    }),
      this.eventInfoGroup = this.formBuilder.group({
        nameEvent: [null, Validators.required],
        eventType: [null, Validators.required],
        bannerImage: [null],
        thumbImage: [null],
        eventLocation: [null, Validators.required],
        img: [null],
      });
    this.eventDescriptionGroup = this.formBuilder.group({
      shortDescription: [null, Validators.required],
      fullDescription: [null, Validators.required],
    });
    this.eventTicketGroup = this.formBuilder.group({
      amountOfTickets: [null, Validators.required],
      maxOrderTickets: [null, Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      earlyBirdDate: [null],
      earlyBirdPrice: [null],
    });
    this.listEventTypes();
    this.listLocation();
  }

  addLocation() {
    this.newLocation.buildingName = this.locationModalForm.value.buildingName;
    this.newLocation.address = this.locationModalForm.value.locationStreet;
    this.newLocation.zipCode = this.locationModalForm.value.locationZip;
    this.newLocation.city = this.locationModalForm.value.locationCity;
    this.newLocation.country = this.locationModalForm.value.locationCountry;
    this.locationService.addLocation(this.newLocation).subscribe(() => {
      this.listLocation();
      this.modalService.dismissAll();
    });
  }

  submit() {
    this.createEvent();
    console.log(this.eventFormData);
    this.eventService.createEvent(this.eventFormData, this.bannerFile, this.thumbFile);
  }

  openModalAddLocation(addContent) {
    this.modalService.open(addContent, {centered: true}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed`;
    });
  }
}
