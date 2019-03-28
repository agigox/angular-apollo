/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const addUser = gql`
  mutation addUser($name: String!, $description: String!) {
    addUser(name: $name, description: $description) {
      id
      name
      description
    }
  }`;

export const Users = gql`
  query {
    users{
      id
      name
      description
    }
  }`;

export const removeUser = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }`;

export const updateUser = gql`
  mutation updateUser($id: String!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }`;
