import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { RatingModule } from 'primeng/rating';
import {FormGroup, FormControl, NgForm} from '@angular/forms';
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
  selectedStars = 0;
  comment = '';
  /*
  reviewForm = new FormGroup({
    comment: new FormControl(''),
    rating: new FormControl(0),
  }); */
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

  onSubmit() {
    const review: Partial<Review> = {
      content: this.comment,
      rating: this.selectedStars
    }
    this.reviewService.createReview(this.id, review).subscribe(  response => {
        console.log(response);
            // @ts-ignore
          this.reviews.push(response);
          console.log('Review created', response.body);
    }
    );
    /*
    const commentValue = this.reviewForm.value.comment;
    const ratingValue = this.reviewForm.value.rating;
    const review: Partial<Review> = {
      content: commentValue !== null ? commentValue : '', // If commentValue is null, assign an empty string
      rating: ratingValue !== null ? ratingValue : 0, // If ratingValue is null, assign 0
    };
    if (this.reviewForm.valid) {
      this.reviewService.createReview(this.id, review).subscribe(
        (data) => {
          console.log('Review created', data);
        },
        (error) => {
          console.log('Error', error);
        }
      );
    } */
  }
  getStars(rating: number) {
    return Array(rating);
  }
}
