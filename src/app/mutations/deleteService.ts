import { gql } from '@apollo/client';

export const DELETE_SERVICE_MUTATION = gql`
  mutation DeleteService($id: String!) {
    deleteServiceById(id: $id) {
      id
    }
  }
`;