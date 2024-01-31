import { Component, Input } from '@angular/core';
import { Book } from '../../Model/Book';
import { Router } from '@angular/router';
import { ReservationService } from '../../Services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  constructor(private route: Router,private reservationService: ReservationService) {}
  @Input() book!: Book;

  ngOnInit(): void {}
  reserve(): void {
    this.reservationService.addreservation(this.book.id) // Call the service method with the book's id
      .subscribe(
        response => {
          console.log(response);
          // Handle successful reservation here
        },
        error => {
          console.log(error);
          // Handle errors here
        }
      );
  }
}
