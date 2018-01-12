import BookModel from './Schemas/Book/BookModel';
import * as Sequelize from 'sequelize';

export default (db: Sequelize.Sequelize) => {
  const models = {
    book: new BookModel()
  };
  for (let model in models) {
    db.define(model, models[model]);
  }
  db.sync();
  return models;
}