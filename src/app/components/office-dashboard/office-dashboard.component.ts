import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';
import {EventService} from '../../services/event-service/event.service';
import {Event} from '../../entities/event/event';

@Component({
  selector: 'app-office-dashboard',
  templateUrl: './office-dashboard.component.html',
  styleUrls: ['./office-dashboard.component.css']
})
export class OfficeDashboardComponent implements OnInit {

  eventData: Event[];
  username: KeycloakProfile;

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 1, rows: 4},
        };
      }

      return {
        columns: 4,
        miniCard: {cols: 1, rows: 1},
        chart: {cols: 2, rows: 2},
        table: {cols: 4, rows: 4},
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private readonly keycloak: KeycloakService,
              private eventService: EventService) {
  }



  ngOnInit(): void {
    this.username = this.keycloak.getKeycloakInstance().idTokenParsed.Organisation;
    this.eventService.getEvents().subscribe({
      next: eventData => {
        this.eventData = eventData;
      }
    });
  }


}
