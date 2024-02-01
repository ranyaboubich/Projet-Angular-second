import { Component, Input } from '@angular/core';
import { Book } from '../../Model/Book';
import { Router } from '@angular/router';
import { ReservationService } from '../../Services/reservation.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  constructor(private route: Router,
              private reservationService: ReservationService,
              private toastr: ToastrService) {}
  @Input() book!: Book;

  ngOnInit(): void {}
  reserve(): void {
    this.reservationService.addreservation(this.book.id) // Call the service method with the book's id
      .subscribe(
        response => {
          console.log(response);
          this.toastr.success('CV retiré avec succès!', 'Succès', {timeOut: 1000});
          // Handle successful reservation here
        },
        error => {
          // Display the error message using ToastrService
          this.toastr.error(error.error.message, 'Error');
          // Handle errors here
        }
      );
  }
}
