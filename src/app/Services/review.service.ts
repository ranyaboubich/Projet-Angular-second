import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Review } from '../Model/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews/';

  constructor(private http: HttpClient) {}

  createReview(id: number, review: Partial<Review>): Observable<HttpResponse<Review>> {
    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.access_token;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    // @ts-ignore
    return this.http.post<Review>('http://localhost:3000/reviews/'+id, review, {headers, observe: 'response'}).pipe(
      map(response => response.body)
    );
  }

  getReviews(title: string, author: string): Observable<Review[]> {
    let params = new HttpParams().set('title', title).set('author', author);
    return this.http.get<Review[]>(this.apiUrl, { params: params });
  }
}
