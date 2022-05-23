import {TestBed} from '@angular/core/testing';

import {KeycloakInitService} from './keycloak-init.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocationService} from '../location-service/location.service';

describe('KeycloakInitService', () => {
  let service: typeof KeycloakInitService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeycloakInitService]
    });
  });

  describe('KeycloakService Tests', () => {
    beforeEach(() => {
      service = TestBed.inject(KeycloakInitService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

   /* it('should be created', () => {
      expect(service).toBeTruthy();
    });*/
  });
});
