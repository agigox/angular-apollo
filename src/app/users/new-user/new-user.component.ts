import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  constructor(private usersService: UsersService, private modalRef: BsModalRef) { }

  ngOnInit() {
  }
  createUser(formRef) {
    this.usersService.createUser(formRef.value).subscribe();
  }

  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

}
