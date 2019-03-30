import { Component, TemplateRef, OnInit } from '@angular/core';
import { UsersService } from './users/users.service';
import User from './models/User';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewUserComponent } from './users/new-user/new-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: User[]; // List of Users
  modalRef: BsModalRef;
  user: User;
  constructor(private usersService: UsersService, private modalService: BsModalService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data['users'];
    });
  }
  removeUser(id) {
    this.usersService.removeUser(id)
      .subscribe(
        ({ data }) => {
          console.log(data);
        },
        error => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  openModal() {
    this.modalRef = this.modalService.show(NewUserComponent);
  }

  showEditUserForm(user) {
    console.log(user);
    this.user = user;
    this.modalRef = this.modalService.show(NewUserComponent, {initialState: this.user});
  }
}
