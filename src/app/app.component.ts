import { Component, TemplateRef, OnInit } from '@angular/core';
import { UsersService } from './users/users.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NewUserComponent } from './users/new-user/new-user.component';
import User from './models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  modalRef: BsModalRef;
  user: User;
  constructor(private usersService: UsersService, private modalService: BsModalService) { }
  ngOnInit() {
  }
  openModal() {
    this.modalRef = this.modalService.show(NewUserComponent);
  }
  setDataFromChild(event) {
    this.user = event;
  }
}
