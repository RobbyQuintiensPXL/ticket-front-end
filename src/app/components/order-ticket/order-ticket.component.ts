import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/custom.validator';

@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.css']
})
export class OrderTicketComponent implements OnInit {

  orderTicketGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  // Getters

  get name() {
    return this.orderTicketGroup.get('name');
  }

  get firstName() {
    return this.orderTicketGroup.get('firstName');
  }

  get address() {
    return this.orderTicketGroup.get('address');
  }

  get zipCode() {
    return this.orderTicketGroup.get('zipCode');
  }

  get city() {
    return this.orderTicketGroup.get('city');
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

  // ngOnInit

  ngOnInit(): void {
    this.orderTicketGroup = this.formBuilder.group({
      name: [null, Validators.required],
      firstName: [null, Validators.required],
      address: [null, Validators.required],
      zipCode: [null, Validators.required],
      city: [null, [Validators.required, Validators.minLength(3),
        Validators.pattern('^[a-zA-Z -]*$')]],
      email: [null, [Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      confEmail: [null, Validators.required],
      amountTicket: [null, Validators.required],
    },
      {validators: CustomValidators.mustMatch('email', 'confEmail')});
  }

}
