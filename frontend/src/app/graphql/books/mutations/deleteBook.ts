import gql from 'graphql-tag';

export default gql`
  mutation deleteBook(
    $id: Int!
  ){
    deleteBook(id: $id)
  }
`;