import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly imageUrl: string;

  constructor(private http: HttpClient) {
    this.imageUrl = '/event/files';
  }

  public getImageByName(file: string): Observable<Blob> {
    const endpoint =  this.imageUrl + '/' + file;
    console.log(endpoint);
    return this.http.get(endpoint,  {responseType: 'blob'}).pipe(
      catchError(error => {
        return throwError('No Images Found');
      })
    );
  }
}
