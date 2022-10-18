import { gql } from '@apollo/client/core'

export const createUser = gql`
  mutation CreateUser($uid: String!) {
    createUser(createUserInput: { uid: $uid }) {
      id
      uid
      observations {
        id
        name
        description
        createdAt
        updatedAt
      }
      observationsCount
      createdAt
      updatedAt
    }
  }
`
