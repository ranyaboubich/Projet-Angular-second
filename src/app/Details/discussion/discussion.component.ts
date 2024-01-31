import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { RatingModule } from 'primeng/rating';
import { FormGroup, FormControl } from '@angular/forms';
import { Review } from '../../Model/Review';
import { Book } from '../../Model/Book';
import { ActivatedRoute } from '@angular/router';
import {
  ClickEvent,
  HoverRatingChangeEvent,
  RatingChangeEvent,
} from 'angular-star-rating';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent implements OnInit {
  @Input() book!: Book;
  reviews: Review[] = [];
  reviewForm = new FormGroup({
    comment: new FormControl(''),
    rating: new FormControl(''),
  });
  id: any;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {}
  onClickResult!: ClickEvent;
  onRatingChangeResult!: RatingChangeEvent;
  onHoverRatingChangeResult!: HoverRatingChangeEvent;

  ngOnInit() {
    this.reviewService
      .getReviews(this.book.title, this.book.author)
      .subscribe((reviews) => {
        this.reviews = reviews;
        console.log(reviews);
      });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  review!: Review;
  onSubmit() {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(id, review).subscribe(
        (data) => {
          console.log('Review created', data);
        },
        (error) => {
          console.log('Error', error);
        }
      );
    }
  }
  getStars(rating: number) {
    return Array(rating);
  }
}
