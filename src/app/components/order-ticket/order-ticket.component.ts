import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/custom.validator';
import {TicketService} from '../../services/ticket-service/ticket.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.css']
})
export class OrderTicketComponent implements OnInit {

  orderTicketGroup: FormGroup;
  ticketFormData: any;
  id: string;

  constructor(private formBuilder: FormBuilder,
              private ticketService: TicketService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  get name() {
    return this.orderTicketGroup.get('name');
  }

  get firstName() {
    return this.orderTicketGroup.get('firstName');
  }

  // Getters

  get address() {
    return this.orderTicketGroup.get('address');
  }

  get zipCode() {
    return this.orderTicketGroup.get('zipCode');
  }

  get city() {
    return this.orderTicketGroup.get('city');
  }

  get country() {
    return this.orderTicketGroup.get('country');
  }

  get email() {
    return this.orderTicketGroup.get('email');
  }

  get confEmail() {
    return this.orderTicketGroup.get('confEmail');
  }

  get amountTicket() {
    return this.orderTicketGroup.get('amountTicket');
  }

  createTicket(): void {
    this.ticketFormData = {
      eventId: Number(this.id),
      name: this.orderTicketGroup.value.name,
      firstName: this.orderTicketGroup.value.firstName,
      street: this.orderTicketGroup.value.address,
      city: this.orderTicketGroup.value.city,
      zipCode: this.orderTicketGroup.value.zipCode,
      country: this.orderTicketGroup.value.country,
      email: this.orderTicketGroup.value.email,
      numberOfTickets: this.orderTicketGroup.value.amountTicket
    };
  }

  submit() {
    this.createTicket();
    console.log(this.ticketFormData);
    this.ticketService.createTicket(this.ticketFormData, this.ticketFormData.eventId);
    this.router.navigate(['/search'], {queryParams: {type: 'all'}}).catch(error => {
        console.log(error);
      });
  }

  // ngOnInit

  ngOnInit(): void {
    this.orderTicketGroup = this.formBuilder.group({
        name: [null, Validators.required],
        firstName: [null, Validators.required],
        address: [null, Validators.required],
        zipCode: [null, Validators.required],
        city: [null, [Validators.required, Validators.minLength(3),
          Validators.pattern('^[a-zA-Z -]*$')]],
        country: [null, [Validators.required, Validators.minLength(3),
          Validators.pattern('^[a-zA-Z -]*$')]],
        email: [null, [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        confEmail: [null, Validators.required],
        amountTicket: [null, Validators.required],
      },
      {validators: CustomValidators.mustMatch('email', 'confEmail')});
  }

}
