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
  private readonly eventOfficeUrl: string;
  events: Event[];
  event: Event;

  constructor(private http: HttpClient) {
    this.eventUrl = '/event/events';
    this.eventPost = '/event/office/event/post';
    this.eventOfficeUrl = 'event/office';
  }

  public getEventById(id: number): Observable<Event> {
    const endpoint =  this.eventUrl + '/' + id;
    return this.http.get<Event>(endpoint).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEventsByType(type: string): Observable<Event[]> {
    const endpoint = this.eventUrl + '/search?type=' + type;
    return this.http.get<Event[]>(endpoint).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventUrl).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEventsByOffice(): Observable<Event[]>{
    return this.http.get<Event[]>(this.eventOfficeUrl + '/events').pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEventsByOfficeAndType(type: string): Observable<Event[]>{
    return this.http.get<Event[]>(this.eventOfficeUrl + '/search?type=' + type).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public createEvent(eventFormData: any, bannerImage: File, thumbImage: File){
    const endpoint = this.eventPost;
    const body = JSON.stringify(eventFormData);
    const formData = new FormData();
    formData.append('banner', bannerImage);
    formData.append('thumb', thumbImage);
    formData.append('eventResource', new Blob([body], { type: 'application/json'}));
    return this.http.post<Event>(endpoint, formData).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
}
