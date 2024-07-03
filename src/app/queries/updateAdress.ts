import { gql } from '@apollo/client';

export const UPDATE_ADDRESS_BY_ID = gql`
  mutation UpdateAddressById($id: String!, $address: String!) {
    updateAddressById(id: $id, address: $address) {
      id
      address
    }
  }
`;