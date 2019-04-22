import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../global-query';
import { map } from 'rxjs/operators';
import User from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apollo: Apollo) { }
  getUsers(): Observable<User[]>  {
    return this.apollo.watchQuery({
      query: Query.Users
    }).valueChanges.pipe(map(result => {
      return (result.data as any).users_list;
    })
    );
  }

  createUser(user: User) {
    const { name, image_profile, description, age, theme_color , react_score,
      angular_score, git_score, birth_date, is_married } = user;
    return this.apollo
      .mutate({
        mutation: Query.addUser,
        variables: { name, image_profile, description, age, theme_color, react_score,
          angular_score, git_score, birth_date, is_married },
        update: (proxy, { data: { addUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          data.users.push(addUser);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      });
  }

  removeUser(id) {
    return this.apollo
      .mutate({
        mutation: Query.removeUser,
        variables: {
          id: id
        },
        update: (proxy, { data: { removeUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          const index = data.users
            .map(function (x) {
              return x.id;
            })
            .indexOf(id);

          data.users.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      });
  }

  updateUser(user) {
    return this.apollo
      .mutate({
        mutation: Query.updateUser,
        variables: user,
        update: (proxy, { data: { updateUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          const index = data.users
            .map(function (x) {
              return x.id;
            })
            .indexOf(user.id);

          data.users[index].name = user.name;
          data.users[index].description = user.description;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      });
  }

}
