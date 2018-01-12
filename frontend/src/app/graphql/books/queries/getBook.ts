import gql from 'graphql-tag';

export default gql`
  query getBook($id: Int!){
    getBook(id: $id) {
      id,
      title,
      description,
      author,
      price
      }
  }
`;