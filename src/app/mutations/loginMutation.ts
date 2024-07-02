import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      token
      id
    }
  }
`;
