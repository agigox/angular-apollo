import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styles: [
    `
    input.ng-invalid.ng-touched {
      border-color: red;
    }
    `
  ]
})
export class NewUserComponent implements OnInit {

  constructor(private usersService: UsersService, private modalRef: BsModalRef) { }

  ngOnInit() {
  }
  createUser(user) {
    const {name, description} = user;
    this.usersService.createUser(name, description).subscribe();
  }

  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  log(name: String): void {
    console.log(name);
  }

}
