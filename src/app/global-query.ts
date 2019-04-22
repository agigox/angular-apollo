/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const addUser = gql`
  mutation addUser($name: String!, $description: String!) {
    add_user(name: $name, description: $description) {
      id
      name
      description
    }
  }`;

export const Users = gql`
  query {
    users_list {
      id
      name
      description
    }
  }`;

export const removeUser = gql`
  mutation remove_user($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }`;

export const updateUser = gql`
  mutation update_user($id: String!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }`;
