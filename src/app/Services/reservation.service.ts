import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
  addreservation(id: number){
    return this.http.post(this.apiUrl+id,{headers: this.getHttpHeaders()});
  }
}
