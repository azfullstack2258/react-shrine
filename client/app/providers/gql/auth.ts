import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation($input: UserInfo!) {
    createUser(input: $input) {
      token
      email
      fullName
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      email
      fullName
    }
  }
`;
