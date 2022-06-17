import {TestBed} from '@angular/core/testing';

import {TicketService} from './ticket.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventService} from '../event-service/event.service';

describe('TicketServiceService', () => {
  let service: TicketService;

  describe('TicketService Tests', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TicketService]
      }).compileComponents();
      service = TestBed.inject(TicketService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
