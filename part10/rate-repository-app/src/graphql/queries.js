import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Query($first: Int) {
    repositories(first: $first) {
      edges {
        node {
          description
          forksCount
          fullName
          id
          language
          name
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          url
        }
      }
    }
  }
`;

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`;
