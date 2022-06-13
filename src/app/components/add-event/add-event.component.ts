import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventTypeService} from '../../services/event-type/event-type.service';
import {LocationService} from '../../services/location-service/location.service';
import {Location} from '../../entities/location/location';
import {EventService} from '../../services/event-service/event.service';
import {Event} from '../../entities/event/event';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

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
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private eventTypeService: EventTypeService,
              private locationService: LocationService,
              private eventService: EventService,
              private modalService: NgbModal,
              private router: Router,
              private snackBar: MatSnackBar) {
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
      buildingName: [null, Validators.required],
      locationStreet: [null, [Validators.required, Validators.minLength(4)]],
      locationZip: [null, [Validators.required, Validators.minLength(4)]],
      locationCity: [null, [Validators.required, Validators.minLength(3),
        Validators.pattern('^[a-zA-Z -]*$')]],
      locationCountry: [null, [Validators.required, Validators.minLength(4),
        Validators.pattern('^[a-zA-Z -]*$')]],
    });
    this.eventInfoGroup = this.formBuilder.group({
      nameEvent: [null, [Validators.required, Validators.minLength(4)]],
      eventType: [null, Validators.required],
      bannerImage: [null, [Validators.required]],
      thumbImage: [null, Validators.required],
      eventLocation: [null, Validators.required],
      img: [null],
    });
    this.eventDescriptionGroup = this.formBuilder.group({
      shortDescription: [null, [Validators.required, Validators.minLength(50),
        Validators.maxLength(400)]],
      fullDescription: [null, [Validators.required, Validators.minLength(100),
        Validators.maxLength(1450)]],
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
    this.newLocation = new Location();
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
    this.submitted = true;
    this.router.navigate(['/']);
    this.openSnackBar('Event successfully added', 'OK');
  }

  openModalAddLocation(addContent) {
    this.modalService.open(addContent, {centered: true}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed`;
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  // Getters

  get shortDescription() {
    return this.eventDescriptionGroup.get('shortDescription');
  }

  get fullDescription() {
    return this.eventDescriptionGroup.get('fullDescription');
  }

  get amountOfTickets() {
    return this.eventTicketGroup.get('amountOfTickets');
  }

  get maxOrderTickets() {
    return this.eventTicketGroup.get('maxOrderTickets');
  }

  get price() {
    return this.eventTicketGroup.get('price');
  }

  get date() {
    return this.eventTicketGroup.get('date');
  }

  get time() {
    return this.eventTicketGroup.get('time');
  }

  get buildingName() {
    return this.locationModalForm.get('buildingName');
  }

  get locationStreet() {
    return this.locationModalForm.get('locationStreet');
  }

  get locationZip() {
    return this.locationModalForm.get('locationZip');
  }

  get locationCity() {
    return this.locationModalForm.get('locationCity');
  }

  get locationCountry() {
    return this.locationModalForm.get('locationCountry');
  }

  get eventName() {
    return this.eventInfoGroup.get('nameEvent');
  }

  get bannerImage() {
    return this.eventInfoGroup.get('bannerImage');
  }

  get thumbImage() {
    return this.eventInfoGroup.get('thumbImage');
  }

  get eventTypeValue() {
    return this.eventInfoGroup.get('eventType');
  }

  get eventLocation() {
    return this.eventInfoGroup.get('eventLocation');
  }


}
