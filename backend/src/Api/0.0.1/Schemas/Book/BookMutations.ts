import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInput,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
  GraphQLError
} from 'graphql';
import * as Sequelize from 'sequelize';

import BookType from './BookType';
import CreateBookInput from './Input/CreateBookInput';
import UpdateBookInput from './Input/UpdateBookInput';
import BookValidation from './BookValidation';

export default (db: Sequelize.Sequelize) => new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        input: {
          type: CreateBookInput,
        },
      },
      resolve: (_, {input}) => {
        let validation = new BookValidation();
        if (!validation.validate(input)) {
          throw new GraphQLError();
        }
        return db.models.book.create(input)
          .catch((error) => {
            return false;
          });
      }
    },
    updateBook: {
      type: BookType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        input: {
          type: UpdateBookInput,
        },
      },
      resolve: (_, {id, input}) => {
        //we're validating the fields here, but not sending error messages
        // to the client, as the client also validates
        let validation = new BookValidation();
        if (!validation.validate(input)) {
          throw new GraphQLError();
        }
        return db.models.book.findById(id)
          .then((book) => {
            return book.update(input, {returning: true});
          })
          .catch((book) => {
            return false;
          });
      }
    },
    deleteBook: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: (_, {id}) => {
        return db.models.book.findById(id)
          .then((book) => {
            return book.destroy();
          })
          .catch((error) => {
            return false;
          });
      }
    }
  }
});