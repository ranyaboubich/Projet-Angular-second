import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from '../../Services/review.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Review } from '../../Model/Review';
import { Book } from '../../Model/Book';
import { ActivatedRoute } from '@angular/router';
import { ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';

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
    ) {
    
  }
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
  onClick(event: { rating: number; }){
    /* console.log('onClick $event: ', $event);
    this.onClickResult = $event; */
  }
  onSubmit() {
    console.warn(this.reviewForm.value);
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    console.log('onRatingUpdated $event: ', $event);
    this.onRatingChangeResult = $event;
  };
  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    this.onHoverRatingChangeResult = $event;
  };

  getStars(rating: string) {
    return Array(rating);
  }
}
