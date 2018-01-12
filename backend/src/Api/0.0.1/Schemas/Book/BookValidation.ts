import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import DefaultValidator from 'Lib/DefaultValidator';

export default class BookValidation extends DefaultValidator {
  rules = {
    title: (value) => {
      console.log(value);
      return value.length <= 255;
    },
    description: (value) => {
      return value.length === 0 || value.length <= 255;
    },
    author: (value) => {
      return value.length === 0 || value.length <= 255;
    },
    price: (value) => {
      return value > 0 && value <= 1000.00;
    }
  };
}
