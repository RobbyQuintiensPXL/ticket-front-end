import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocationService} from './location.service';

describe('LocationService', () => {
  let service: LocationService;
  let httpTestingController: HttpTestingController;
  let mockLocation: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });
  });

  describe('getAllLocations', () => {
    beforeEach(() => {
      service = TestBed.inject(LocationService);
      httpTestingController = TestBed.inject(HttpTestingController);
      mockLocation = { id: 2, buildingName: 'MockBuilding', zipCode: '3500',
      city: 'MockCity', address: 'mock address', country: 'MockLand', ticketOffice: 'mockOrg'};
    });

    it('should return all locations', () => {
      service.getLocations().subscribe((locations) => {
        expect(locations[0]).toEqual(mockLocation);
      });

      const request = httpTestingController.expectOne('app/locations');

      request.flush([mockLocation]);

      httpTestingController.verify();
    });
  });
});
