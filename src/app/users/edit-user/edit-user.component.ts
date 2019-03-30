import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import User from '../../models/User';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: User;
  constructor(
    private usersService: UsersService,
    public modalRef: BsModalRef
  ) {}
  updateUser() {
    console.log(this.user);
    this.usersService.updateUser(this.user, this.user.id).subscribe(
      ({ data }) => {
        this.closeFirstModal();
      },
      error => {
        console.log('there was an error sending the query', error);
      }
    );
  }

  closeFirstModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }
}
