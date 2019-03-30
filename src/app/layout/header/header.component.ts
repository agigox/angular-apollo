import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="col-md-12 text-md-center text-uppercase font-weight-light border border-light rounded text-white bg-dark aa-title-block">
      <h3>Users List List</h3>
    </div>
  `,
  styles: [`
    .aa-title-block {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
