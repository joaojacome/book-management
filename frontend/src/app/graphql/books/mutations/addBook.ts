import gql from 'graphql-tag';

export default gql`
  mutation addBook(
    $title: String!,
    $description: String!,
    $author: String!,
    $price: Float!,
  ){
    addBook(input: {
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