import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Event} from '../../entities/event/event';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Event[];
  event: Event;
  private readonly eventUrl: string;
  private readonly eventPost: string;
  private readonly eventOfficeUrl: string;

  constructor(private http: HttpClient) {
    this.eventUrl = '/event/events';
    this.eventPost = '/event/office/event/post';
    this.eventOfficeUrl = 'event/office';
  }

  public getEventById(id: number): Observable<Event> {
    const endpoint = this.eventUrl + '/' + id;
    return this.http.get<Event>(endpoint).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEvents(param: any): Observable<any> {
    return this.http.get<any>(this.eventUrl, {params: param}).pipe(
      tap(_ => console.log(param)),
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEventsByOffice(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventOfficeUrl + '/events').pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEventsByOfficeAndType(type: string): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventOfficeUrl + '/search?type=' + type).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public getEventsByTypeAndOrCityAndOrEventName(param: any): Observable<any> {
    const endpoint = this.eventUrl + '/search';
    console.log(param);
    return this.http.get<any>(endpoint, {params: param}).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }

  public createEvent(eventFormData: any, bannerImage: File, thumbImage: File) {
    const endpoint = this.eventPost;
    const body = JSON.stringify(eventFormData);
    const formData = new FormData();
    formData.append('banner', bannerImage);
    formData.append('thumb', thumbImage);
    formData.append('eventResource', new Blob([body], {type: 'application/json'}));
    return this.http.post<Event>(endpoint, formData).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }
}
