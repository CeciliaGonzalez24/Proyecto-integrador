import { gql } from '@apollo/client';

export const GET_SERVICES_USER = gql`
  query GetServicesByUser($id: String!) {
    getServicesByUser(id: $id) {
      id
      name
      description
      price
      user {
        name
        email
      }
    }
  }
`;