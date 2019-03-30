import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Apollo
import { GraphQLModule } from './graphql.module';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UsersService } from './users/users.service';
import { HeaderComponent } from './layout/header/header.component';
import { NewUserComponent } from './users/new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    HeaderComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // provides HttpClient for HttpLink
    GraphQLModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    UsersService
  ],
  entryComponents: [NewUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
