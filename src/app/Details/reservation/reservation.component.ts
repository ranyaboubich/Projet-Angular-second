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
      .subscribe( isReserved => {
        if (isReserved){
          // @ts-ignore
          const user = JSON.parse(localStorage.getItem('currentUser'));
          //l book w l user kaadin yarjouu jawhom behi
          this.reservationService.getReservationsById(this.book.id,user).subscribe( reserver => {
            console.log('le user qui a reserve le book',reserver.username);
            if (reserver.id !== user.id){
              this.toastr.error('You are added to the waiting list', 'Error');
            }
            }
          )
        }else{
          this.toastr.success('Book reserved successfully', 'Success');
        }
        }, error => {
          this.toastr.error(error.error.message, 'Error');
        }

      );
  }
}
