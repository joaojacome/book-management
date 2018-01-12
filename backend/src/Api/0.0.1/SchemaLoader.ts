import BookSchema from './Schemas/Book/BookSchema';
import * as Sequelize from 'sequelize';

export default (db: Sequelize.Sequelize) => {
  return {
    book: BookSchema(db)
  };
}