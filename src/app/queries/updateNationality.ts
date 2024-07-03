import { gql } from '@apollo/client';

export const UPDATE_NATIONALITY_BY_ID = gql`
  mutation UpdateNationalityById($id: String!, $nationality: String!) {
    updateNationalityById(id: $id, nationality: $nationality) {
      id
      nationality
    }
  }
`;