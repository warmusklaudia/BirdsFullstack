import { gql } from '@apollo/client/core'
export const GET_USER_BY_UID = gql`
  query GetUserByUid($uid: String!) {
    user(uid: $uid) {
      id
      uid
      observations {
        id
        title
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
