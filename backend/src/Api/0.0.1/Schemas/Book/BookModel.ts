import * as Sequelize from 'sequelize';

export default class BookModel {
  public id = {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  };

  public title = Sequelize.STRING;
  public description = Sequelize.STRING;
  public author = Sequelize.STRING;
  public price = Sequelize.DECIMAL(10,2);

  public createdAt = Sequelize.DATE;
  public updatedAt = Sequelize.DATE;

  public test(n: number):number {
    return n*2;
  }
}
