import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

export default new GraphQLInputObjectType({
  name: 'UpdateBookInput',
  fields: {
    id: { type: GraphQLInt },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
  }
});
