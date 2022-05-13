import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../entities/event/event';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  orderTrueOutput = false;
  detail: any;
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) {
  }

  setValue(order: boolean) {
    this.orderTrueOutput = order;
  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

}
