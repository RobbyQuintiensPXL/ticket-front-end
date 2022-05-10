import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription, throwError} from 'rxjs';
import {Event} from '../../entities/event/event';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly eventUrl: string;
  private readonly eventPost: string;
  events: Event[];
  event: Event;

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'multipart/form-data')
      .set('Access-Control-Allow-Origin', '*')
  };

  constructor(private http: HttpClient) {
    this.eventUrl = '/event/events';
    this.eventPost = '/event/office/event/post';
  }

  public getEventById(id: number): Observable<Event> {
    const endpoint =  this.eventUrl + '/' + id;
    return this.http.get<Event>(endpoint);
  }

  public getEventsByType(type: string): Observable<Event[]> {
    const endpoint = this.eventUrl + '/search?type=' + type;
    return this.http.get<Event[]>(endpoint);
  }

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public createEvent(event: Event): Observable<Event>{
    const endpoint = this.eventPost;
    const body = JSON.stringify(event);
    return this.http.post<Event>(endpoint, body, this.httpOptions);
  }
}
