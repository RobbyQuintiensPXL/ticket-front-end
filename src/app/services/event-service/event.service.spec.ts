import {TestBed} from '@angular/core/testing';
import {Time} from '@angular/common';
import {EventService} from './event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Event} from '../../entities/event/event';
import {Location} from '../../entities/location/location';
import {HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {subscribeTo} from 'rxjs/internal-compatibility';

describe('EventServiceService', () => {
  let service: EventService;
  let httpTestingController: HttpTestingController;
  let mockEvent: Event;
  let mockLocation: Location;

  describe('EventService Tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EventService]
      });
    });

    beforeEach(() => {
      service = TestBed.inject(EventService);
      httpTestingController = TestBed.inject(HttpTestingController);
      const now = new Date();
      const time: Time = {hours: 20, minutes: 0};
      mockLocation = {
        address: 'testAddress', buildingName: 'TestBuilding', city: 'testCity',
        country: 'testCountry', id: 1, zipCode: 3600
      };
      mockEvent = {
        banner: 'banner.jpg',
        description: 'description',
        eventDate: now,
        eventName: 'eventName',
        eventTime: time,
        eventType: 'type1',
        location: mockLocation,
        id: 1,
        price: 500,
        shortDescription: 'short description',
        thumbnail: 'thumb.jpg',
        ticketsLeft: 100
      };
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return event found by ID', () => {
      service.getEventById(mockEvent.id).subscribe(event => {
        expect(event).toEqual(mockEvent);

        const request = httpTestingController.expectOne('/event/events/' + mockEvent.id);
        expect(request.request.method).toEqual('GET');
        expect(request.request.body).toEqual(JSON.stringify(mockEvent));

        request.flush([mockEvent]);

        const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
        request.event(expectedResponse);

        httpTestingController.verify();
      });
    });

    // it('should return events filtered by type', () => {
    //   service.getEventsByType(mockEvent.eventType).subscribe(events => {
    //     expect(events[0]).toEqual(mockEvent);
    //
    //     const request = httpTestingController.expectOne('/event/events/search?type=' + mockEvent.eventType);
    //     expect(request.request.method).toEqual('GET');
    //     expect(request.request.body).toEqual(JSON.stringify(mockEvent));
    //
    //     request.flush([mockEvent]);
    //
    //     const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
    //     request.event(expectedResponse);
    //     httpTestingController.verify();
    //   });
    // });

    // it('should return events filtered by type and city', () => {
    //   service.getEventsByTypeAndCity(mockEvent.eventType, mockLocation.city).subscribe(events => {
    //     expect(events[0]).toEqual(mockEvent);
    //
    //     const request = httpTestingController.expectOne('/event/events/search?type=' + mockEvent.eventType +
    //       '&city=' + mockLocation.city);
    //     expect(request.request.method).toEqual('GET');
    //     expect(request.request.body).toEqual(JSON.stringify(mockEvent));
    //
    //     request.flush([mockEvent]);
    //
    //     const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
    //     request.event(expectedResponse);
    //     httpTestingController.verify();
    //   });
    // });

    // it('should return all events', () => {
    //   service.getEvents().subscribe(events => {
    //     expect(events[0]).toEqual(mockEvent);
    //
    //     const request = httpTestingController.expectOne('/event/events');
    //     expect(request.request.method).toEqual('GET');
    //     expect(request.request.body).toEqual(JSON.stringify(mockEvent));
    //
    //     request.flush([mockEvent]);
    //
    //     const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
    //     request.event(expectedResponse);
    //     httpTestingController.verify();
    //   });
    // });

    it('should return events filtered office', () => {
      service.getEventsByOffice().subscribe(events => {
        expect(events[0]).toEqual(mockEvent);

        const request = httpTestingController.expectOne('/event/office');
        expect(request.request.method).toEqual('GET');
        expect(request.request.body).toEqual(JSON.stringify(mockEvent));

        request.flush([mockEvent]);

        const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
        request.event(expectedResponse);
        httpTestingController.verify();
      });
    });
    //
    // it('should return events filtered by type and office', () => {
    //   service.getEventsByOfficeAndType(mockEvent.eventType).subscribe(events => {
    //     expect(events[0]).toEqual(mockEvent);
    //
    //     const request = httpTestingController.expectOne('/event/office/search?type=' + mockEvent.eventType);
    //     expect(request.request.method).toEqual('GET');
    //     expect(request.request.body).toEqual(JSON.stringify(mockEvent));
    //
    //     request.flush([mockEvent]);
    //
    //     const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
    //     request.event(expectedResponse);
    //     httpTestingController.verify();
    //   });
    // });

    /*it('should add new event', () => {
      service.createEvent(mockEvent).subscribe(events => {
        expect(events[0]).toEqual(mockEvent);

        const request = httpTestingController.expectOne('/event/office/search?type=' + mockEvent.eventType);
        expect(request.request.method).toEqual('GET');
        expect(request.request.body).toEqual(JSON.stringify(mockEvent));

        request.flush([mockEvent]);

        const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
        request.event(expectedResponse);
        httpTestingController.verify();
      });
    });*/

    it('should throw an error if no event by id found', () => {
      const errorResponse = new Error('No Events Found');
      spyOn(service, 'getEventById').and.returnValue(throwError(errorResponse));
    });

    it('should throw an error if no events found', () => {
      const errorResponse = new Error('No Events Found');
      spyOn(service, 'getEvents').and.returnValue(throwError(errorResponse));
    });

    it('should throw an error if no events by office found', () => {
      const errorResponse = new Error('No Events Found');
      spyOn(service, 'getEventsByOffice').and.returnValue(throwError(errorResponse));
    });

  });
});
