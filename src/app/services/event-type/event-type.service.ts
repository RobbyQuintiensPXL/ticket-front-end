import { Injectable } from '@angular/core';
import {Event} from '../../entities/event/event';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  private readonly eventTypesUrl: string;
  eventTypes: string[];

  constructor(private http: HttpClient) {
    this.eventTypesUrl = '/event/events/types';
  }

  public getEventTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.eventTypesUrl).pipe(
      catchError(error => {
        return throwError('No EventTypes Found');
      })
    );
  }

}
