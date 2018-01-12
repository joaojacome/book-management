import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLInt, },
    title: { type: GraphQLString, },
    description: { type: GraphQLString, },
    author: { type: GraphQLString, },
    price: { type: GraphQLFloat, },
  }
});
