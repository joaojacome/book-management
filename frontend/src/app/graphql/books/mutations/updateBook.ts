import gql from 'graphql-tag';

export default gql`
  mutation updateBook(
    $id: Int!,
    $title: String!,
    $description: String!,
    $author: String!,
    $price: Float!,
  ){
    updateBook(id: $id, input: {
      title: $title,
      description: $description,
      author: $author,
      price: $price
    }) {
      id,
      title
    }
  }
`;