import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation($username: String!) {
    createUser(username: $username) {
      _id
      token
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      username
      email
      password
    }
  }
`;
