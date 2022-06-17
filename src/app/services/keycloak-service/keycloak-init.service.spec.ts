import {TestBed} from '@angular/core/testing';

import {KeycloakInitService} from './keycloak-init.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocationService} from '../location-service/location.service';
import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../environments/environment';
import {APP_INITIALIZER} from '@angular/core';
import {MockedKeycloakService} from './mocked-keycloak.service';

describe('KeycloakInitService', () => {
  let service: typeof KeycloakInitService;

  describe('KeycloakService Tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MockedKeycloakService],
        providers: [KeycloakInitService],
      }).compileComponents();
      service = TestBed.inject(KeycloakInitService);
    });

/*    it('should be created', () => {
      expect(service).toBeTruthy();
    });*/
  });
});
