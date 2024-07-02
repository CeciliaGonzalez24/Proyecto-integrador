import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($registerDto: RegisterDto!) {
    register(registerDto: $registerDto) {
      id
      name
      lastName
      email
    }
  }
`;