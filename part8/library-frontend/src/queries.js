import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      born
      bookCount
      id
      name
    }
  }
`;

export const GET_BOOKS = gql`
  query AllAuthors {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`;

export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author
      id
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation Mutation(
    $name: String!
    $setBornTo: Int!
  ){
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ){
      name
      id
      born
    }
  }
`
