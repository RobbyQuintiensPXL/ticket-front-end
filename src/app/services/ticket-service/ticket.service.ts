import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event} from '../../entities/event/event';
import {Observable, throwError} from 'rxjs';
import {catchError, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly ticketUrl: string;

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) {
    this.ticketUrl = '/ticket/tickets';
  }

  public createTicket(ticketFormData: any, eventId: number){
    const endpoint = `${this.ticketUrl}/${eventId}/order`;
    const body = JSON.stringify(ticketFormData);
    return this.http.post<any>(endpoint, body, this.httpOptions).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }

  public getTicketsSold(eventId: number): Observable<number>{
    const endpoint = `${this.ticketUrl}/ticket/${eventId}/ticketsleft`;
    return this.http.get<number>(endpoint).pipe(
      catchError(error => {
        return throwError('No Events Found');
      })
    );
  }
}
