import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../Model/Review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}

  createReview(id:number,review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl+id, review);
  }

  getReviews(title: string, author: string): Observable<Review[]> {
    let params = new HttpParams().set('title', title).set('author', author);
    return this.http.get<Review[]>(this.apiUrl, { params: params });
  }
}
