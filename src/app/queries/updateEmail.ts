import { gql } from '@apollo/client';

export const UPDATE_EMAIL_BY_ID = gql`
  mutation UpdateEmailById($id: String!, $newEmail: String!) {
    updateEmailById(id: $id, newEmail: $newEmail) {
      id
      email
    }
  }
`;