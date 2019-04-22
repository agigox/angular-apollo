/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const addUser = gql`
  mutation addUser($name: String!, $image_profile: String!, $description: String,
    $age: Int!, $theme_color: COLORS!, $react_score: Int!, $angular_score: Int!,
    $git_score: Int!, $birth_date: String!, $is_married: Boolean!) {
    add_user(name: $name, image_profile: $image_profile, description: $description,
      age: $age, theme_color: $theme_color, react_score: $react_score, angular_score: $angular_score,
      git_score: $git_score, birth_date: $birth_date, is_married: $is_married) {
      id
      name
      image_profile
      description
      age
      theme_color
      react_score
      angular_score
      git_score
      birth_date
      is_married
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
