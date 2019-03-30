import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../global-query';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apollo: Apollo) { }
  getUsers() {
    return this.apollo.watchQuery({
      query: Query.Users
    }).valueChanges.pipe(map(result => {
      return result.data;
    })
    );
  }

  createUser(user) {
    return this.apollo
      .mutate({
        mutation: Query.addUser,
        variables: {
          name: user.name,
          description: user.description
        },
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
      })
  }

  updateUser(user, userId) {
    return this.apollo
      .mutate({
        mutation: Query.updateUser,
        variables: {
          id: userId,
          name: user
        },
        update: (proxy, { data: { updateUser } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.Users });

          const index = data.users
            .map(function (x) {
              return x.id;
            })
            .indexOf(userId);

          data.users[index].name = user;

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.Users, data });
        }
      })
  }

}
