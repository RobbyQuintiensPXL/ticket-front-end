import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocationService} from './location.service';
import {Location} from '../../entities/location/location';
import {HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

describe('LocationService', () => {
  let service: LocationService;
  let httpTestingController: HttpTestingController;
  let mockLocation: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });
  });

  describe('LocationService Tests', () => {
    beforeEach(() => {
      service = TestBed.inject(LocationService);
      httpTestingController = TestBed.inject(HttpTestingController);
      mockLocation = {
        id: 2, buildingName: 'MockBuilding', zipCode: 3500,
        city: 'MockCity', address: 'mock address', country: 'MockLand'
      };
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return all locations', () => {
      service.getLocations().subscribe((locations) => {
        expect(locations[0]).toEqual(mockLocation);
      });

      const request = httpTestingController.expectOne('/event/locations');

      request.flush([mockLocation]);

      httpTestingController.verify();
    });

    it('should return locations for a ticketoffice', () => {
      service.getLocationsByTicketOffice().subscribe(locations => {
        expect(locations[0]).toEqual(mockLocation);
      });

      const request = httpTestingController.expectOne('/event/locations/office');

      request.flush([mockLocation]);

      httpTestingController.verify();
    });

    it('should add new location', () => {
      const loc: Location = {
        address: 'testAddress', buildingName: 'TestBuilding', city: 'testCity',
        country: 'testCountry', id: 1, zipCode: 3600
      };
      service.addLocation(loc).subscribe(location => {
        expect(location).toEqual(loc);
      });

      const request = httpTestingController.expectOne('/event/locations/add_location');
      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(JSON.stringify(loc));

      const expectedResponse = new HttpResponse({status: 201, statusText: 'Created', body: loc});
      request.event(expectedResponse);

      httpTestingController.verify();
    });

    it('should throw an error if no locations found', () => {
      const errorResponse = new Error('No Locations Found');
      spyOn(service, 'getLocations').and.returnValue(throwError(errorResponse));
    });

    it('should throw an error if no locations by office found', () => {
      const errorResponse = new Error('No Locations Found');
      spyOn(service, 'getLocationsByTicketOffice').and.returnValue(throwError(errorResponse));
    });

    it('should throw an error if no location created', () => {
      const errorResponse = new Error('Something wrong');
      spyOn(service, 'addLocation').and.returnValue(throwError(errorResponse));
    });
  });
});
