import {Injectable} from '@angular/core';
import {Location} from '../../entities/location/location';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Event} from '../../entities/event/event';
import {catchError, map} from 'rxjs/operators';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly locationUrl: string;
  private readonly locationPost: string;
  locations: Location[];
  location: Location;

  constructor(private http: HttpClient) {
    this.locationUrl = '/event/locations';
    this.locationPost = '/event/locations/add_location';
  }

  httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
  };

  public getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl).pipe(
      catchError(error => {
        return throwError('No Locations Found');
      })
    );
  }

  public addLocation(location: Location): Observable<Location> {
    const body = JSON.stringify(location);
    return this.http.post<Location>(this.locationPost, body, this.httpOptions).pipe(
      catchError(error => {
        return throwError('Something wrong');
      })
    );
  }

  public getLocationsByTicketOffice(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationUrl + '/office').pipe(
      catchError(error => {
        return throwError('No Locations Found');
      })
    );
  }


}
