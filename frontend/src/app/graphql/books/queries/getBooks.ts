import gql from 'graphql-tag';

export default gql`
  query getBooks{
    getBooks {
      id,
      title,
      description,
      author,
      price
    }
  }
`;