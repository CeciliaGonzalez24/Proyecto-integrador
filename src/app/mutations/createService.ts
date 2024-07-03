import { gql } from '@apollo/client';

export const CREATE_SERVICE_MUTATION = gql`
  mutation CreateService($createService: CreateServiceDto!) {
    createService(createService: $createService) {
      name
      id
    }
  }
`;