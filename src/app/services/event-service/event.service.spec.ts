import {TestBed} from '@angular/core/testing';
import {Time} from '@angular/common';
import {EventService} from './event.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Event} from '../../entities/event/event';
import {Location} from '../../entities/location/location';
import {HttpResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Params} from '@angular/router';

describe('EventServiceService', () => {
  let service: EventService;
  let httpTestingController: HttpTestingController;
  let mockEvent: Event;
  let mockLocation: Location;
  let mockParams: Params;

  describe('EventService Tests', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EventService]
      }).compileComponents();
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
        ticketsLeft: 100,
        accepted: true
      };
      mockParams = {
        location_city: mockEvent.location.city,
        eventType: mockEvent.eventType,
      };
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return event found by ID', () => {
      service.getEventById(mockEvent.id).subscribe(event => {
        expect(event.eventName).toEqual(mockEvent.eventName);
      });
      const request = httpTestingController.expectOne('/event/events/' + mockEvent.id);
      expect(request.request.method).toEqual('GET');


      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: mockEvent});
      request.event(expectedResponse);
      request.flush(mockEvent);
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

    it('should return events filtered by type and city', () => {
      service.getEventsByTypeAndOrCityAndOrEventName(mockParams).subscribe(events => {
        expect(events[0].eventType).toEqual(mockEvent.eventType);
      });
      const request = httpTestingController.expectOne(
        `/event/events/search?location_city=${mockEvent.location.city}&eventType=${mockEvent.eventType}`);
      expect(request.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: [mockEvent]});
      request.event(expectedResponse);
      request.flush([mockEvent]);
    });

    it('should return all events', () => {
      service.getEvents().subscribe(events => {
        expect(events[0].banner).toEqual(mockEvent.banner);
      });

      const request = httpTestingController.expectOne('/event/events');
      expect(request.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: [mockEvent]});
      request.event(expectedResponse);
      request.flush([mockEvent]);
    });
    it('should return events filtered office', () => {
      service.getEventsByOffice(mockParams).subscribe(events => {
        expect(events[0].thumbnail).toEqual(mockEvent.thumbnail);
      });

      const request = httpTestingController.expectOne(
        `event/office/events?location_city=${mockEvent.location.city}&eventType=${mockEvent.eventType}`);
      expect(request.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: [mockEvent]});
      request.event(expectedResponse);
      request.flush([mockEvent]);
    });
    it('should return events for admin', () => {
      service.getEventsForAdmin(mockParams).subscribe(events => {
        expect(events[0].location.buildingName).toEqual(mockEvent.location.buildingName);
      });

      const request = httpTestingController.expectOne(
        `event/admin/events?location_city=${mockEvent.location.city}&eventType=${mockEvent.eventType}`);
      expect(request.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse({status: 200, statusText: 'OK', body: [mockEvent]});
      request.event(expectedResponse);
      request.flush([mockEvent]);
    });

    it('should approve an event', () => {
      service.approveEvent(mockEvent.id, mockEvent).subscribe(events => {
        expect(events[0].accepted).toEqual(mockEvent.accepted);
      });

      const request = httpTestingController.expectOne(
        `event/admin/event/${mockEvent.id}/approve`);
      expect(request.request.method).toEqual('POST');

      const expectedResponse = new HttpResponse({status: 201, statusText: 'CREATED'});
      request.event(expectedResponse);
    });

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
