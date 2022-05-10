import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EventCardComponent } from './components/event-card/event-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EventService} from './services/event-service/event.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatGridListModule} from '@angular/material/grid-list';
import { FilterTypeComponent } from './components/filter-type/filter-type.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import {AppRoutes} from './app.routes';
import { ProfileComponent } from './components/profile/profile.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {KeycloakInitService} from './services/keycloak-service/keycloak-init.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule} from '@angular/flex-layout';
import { OfficeEventsComponent } from './components/office-events/office-events.component';
import { OfficeHomeComponent } from './components/office-home/office-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EventCardComponent,
    FilterTypeComponent,
    EventDetailComponent,
    ProfileComponent,
    AddEventComponent,
    OfficeEventsComponent,
    OfficeHomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    FontAwesomeModule,
    MatGridListModule,
    RouterModule,
    AppRoutes,
    ReactiveFormsModule,
    KeycloakAngularModule,
    MatFormFieldModule,
    MatStepperModule,
    NgbModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: KeycloakInitService,
      multi: true,
      deps: [KeycloakService]
    },
    EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
