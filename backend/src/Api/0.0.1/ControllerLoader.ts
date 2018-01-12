import * as Sequelize from 'sequelize';
import BookController from './Controllers/BookController';

export default (db: Sequelize.Sequelize, models: any, schemas: any) => {
  return {
    BookController: new BookController(db, models, schemas),
  };
}
