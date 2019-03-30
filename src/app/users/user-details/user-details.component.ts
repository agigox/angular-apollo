import { Component, OnInit, Input } from '@angular/core';
import User from '../../models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  host: {'class': 'aa-users-detail col-md-6'}
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
    console.log(this.user);
  }

}
