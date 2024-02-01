import { Component } from '@angular/core';
import {AdminService} from "../../Services/admin.service";
import {Reservation} from "../../Model/Reservation";
import {User} from "../../Model/User";
import {Book} from "../../Model/Book";
import {NgForm} from "@angular/forms";
import {WaitingList} from "../../Model/WaitingList";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  reservations: Reservation[] = [];
  users: User[] = [];
  books: Book[] = [];
  waitingList: WaitingList[] = [];
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.adminService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.adminService.getBooks().subscribe(books => {
      this.books = books;
    });
    this.adminService.getWaitingList().subscribe(waitingList => {
      this.waitingList = waitingList;
    });

  }

  updateUser(form: NgForm) {
   /* const user: Partial<User> = {
      id: form.value.id
    };
    if (form.value.email) {
      user.email = form.value.email;
    }
    if (form.value.username) {
      user.username = form.value.username;
    }
    if (form.value.password) {
      user.password = form.value.password;
    } */
    const user = {
      id: form.value.id,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password
    };

    this.adminService.updateUser(user.id, user).subscribe(user => {
      this.toastr.success(`Updated User`, 'Success');
      console.log('User updated');
    }, error => {
      this.toastr.error(error.error.message, 'Error');
    });
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(user => {
      console.log('User deleted');
    }, error => {
      this.toastr.success('deleted successfully (refresh to check)', 'Success');
    });
  }

  addBook(form: NgForm) {
    const book = {
      title: form.value.title,
      author: form.value.author,
      instances: form.value.instances,
      category: form.value.category,
      description: form.value.description,
      keywords: form.value.keywords,
      coverImageUrl: form.value.image
    };
    this.adminService.addBook(book).subscribe(book => {
      this.toastr.success(`Book d'id ${book.id} is added successfully`, 'Success');
      console.log('Book added');
    });
  }

  updateBook(form: NgForm) {
    const book = {
      id: form.value.id,
      title: form.value.title,
      author: form.value.author,
      instances: form.value.instances,
      category: form.value.category,
      description: form.value.description,
      keywords: form.value.keywords,
      coverImageUrl: form.value.image
    };
    this.adminService.updateBook(book.id, book).subscribe(book => {
      this.toastr.success(`book updated`, 'Success');
      console.log('Book updated');
    });
  }
  deleteBook(id: number) {
    this.adminService.deleteBook(id).subscribe(book => {
      console.log('Book deleted');
    }, error => {
      this.toastr.success('deleted successfully (refresh to check)', 'Success');
    });
  }

  deleteReservation(id: number) {
    this.adminService.deleteReservation(id).subscribe(reservation => {
      console.log('Reservation deleted');
    }, error => {
      this.toastr.success('deleted successfully (refresh to check)', 'Success');
    });
  }
}
