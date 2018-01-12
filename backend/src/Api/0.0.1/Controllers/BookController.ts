import * as Express from 'express';
import * as Sequelize from 'sequelize';
import * as graphqlHTTP from 'express-graphql';

export default class BookController {

  private router: Express.Router;
  private db: Sequelize.Sequelize;
  public graphQL: graphqlHTTP;

  constructor(db: Sequelize.Sequelize, models: any, schemas: any) {

    this.db = db;

    this.graphQL = graphqlHTTP({
      schema: schemas.book,
      graphiql: true
    });
  }
  
}