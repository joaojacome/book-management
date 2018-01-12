import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import * as Sequelize from 'sequelize';

import BookType from './BookType';

export default (db: Sequelize.Sequelize) => new GraphQLObjectType({
  name: 'Query',
  fields: {
    getBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_, {id}) => {
        return db.models.book.findById(id)
          .catch((error) => {
            return false;
          });
      }
    },
    getBooks: {
      type: new GraphQLList(BookType),
      resolve: (_) => {
        return db.models.book.findAll();
      }
    },
  }
});