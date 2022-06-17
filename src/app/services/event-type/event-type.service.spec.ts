import {TestBed} from '@angular/core/testing';

import {EventTypeService} from './event-type.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LocationService} from '../location-service/location.service';
import {throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

describe('EventTypeService', () => {
  let service: EventTypeService;
  let httpTestingController: HttpTestingController;
  let mockedEventTypes: string[];

  describe('EventTypeService Tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EventTypeService]
      }).compileComponents();
      service = TestBed.inject(EventTypeService);
      httpTestingController = TestBed.inject(HttpTestingController);
      mockedEventTypes = ['type1', 'type2', 'type3'];
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return all eventtypes', () => {
      service.getEventTypes().subscribe(types => {
        expect(types[0]).toEqual(mockedEventTypes);
      });

      const request = httpTestingController.expectOne('/event/events/types');
      expect(request.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: [mockedEventTypes]});
      request.event(expectedResponse);

      request.flush([mockedEventTypes]);
    });

    it('should throw an error if no eventtypes found', () => {
      const errorResponse = new Error('No EventTypes Found');
      spyOn(service, 'getEventTypes').and.returnValue(throwError(errorResponse));
    });
  });
});
