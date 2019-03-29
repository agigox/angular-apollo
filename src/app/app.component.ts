import { Component, TemplateRef, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UsersService } from './users/users.service';

interface User {
  name: String;
  description: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  users: User[]; // List of Users
  user: User;
  name: any;

  constructor(private apollo: Apollo, private modalService: BsModalService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data.users;
    });
  }
  createUser(value, description) {
    this.usersService.createUser(value, description).subscribe(({ data }) => {
      this.closeFirstModal(); // Close Modal
    }, error => {
      console.log('there was an error sending the query', error);
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
  showEditUserForm(user, template) {
    this.name = user.name;
    this.user = user;
    this.modalRef = this.modalService.show(template);
  }
  updateUser(user) {

    this.usersService.updateUser(user, this.user.id)
      .subscribe(
        ({ data }) => {
          this.closeFirstModal();
        },
        error => {
          console.log('there was an error sending the query', error);
        }
      );
  }
  openModal(template: TemplateRef<any>) {
    this.name = '';
    this.user = {};
    this.modalRef = this.modalService.show(template);
  }
  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
