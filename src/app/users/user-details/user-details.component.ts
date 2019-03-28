import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  host: {'class': 'aa-users-detail col-md-6'}
})
export class UserDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
