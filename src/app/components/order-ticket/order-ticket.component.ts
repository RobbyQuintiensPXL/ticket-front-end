import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order-ticket',
  templateUrl: './order-ticket.component.html',
  styleUrls: ['./order-ticket.component.css']
})
export class OrderTicketComponent implements OnInit {

  orderTicketGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
