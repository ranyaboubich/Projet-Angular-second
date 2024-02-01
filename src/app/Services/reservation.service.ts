import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { User } from '../Model/User';
import {Reservation} from "../Model/Reservation";


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservation/';

  constructor(private http: HttpClient) {

  }

  private getHttpHeaders() {
    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.access_token;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  addreservation(id: number) : Observable<any>{
    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.access_token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://localhost:3000/reservation/'+id, {}, {headers}).pipe(
      catchError(error => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
  }
  getReservationsById(id: number, user: User): Observable<Reservation> {
    const params = new HttpParams().set('id', id.toString()).set('user', JSON.stringify(user));
    return this.http.get<Reservation>('http://localhost:3000/reservation/'+id, { headers: this.getHttpHeaders(), params: params });
  }
}
