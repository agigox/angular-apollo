import { Component, OnInit } from '@angular/core';
import User from '../../models/User';
import { UsersService } from '../users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditUserComponent } from '../edit-user/edit-user.component';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[]; // List of Users
  modalRef: BsModalRef;
  constructor(private usersService: UsersService,  private modalService: BsModalService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  showEditUserForm(user) {
    const initialState = {
      user: user
    };
    this.modalRef = this.modalService.show(EditUserComponent, {initialState});
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

}
