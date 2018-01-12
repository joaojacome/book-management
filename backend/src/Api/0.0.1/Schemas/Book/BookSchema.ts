import { GraphQLSchema } from 'graphql';
import BookMutations from './BookMutations';
import BookQueries from './BookQueries';
import * as Sequelize from 'sequelize';

export default (db: Sequelize.Sequelize) => {
    return new GraphQLSchema({ query: BookQueries(db), mutation: BookMutations(db) });
}