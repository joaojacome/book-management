import Logger from 'Lib/Logger';
import * as Sequelize from 'sequelize';

export default class Database {
  public static bootstrap(): Promise<Sequelize.Sequelize> {
    return new Promise((resolve, reject) => {
      Logger.info('Initializing database');
      var db = new Sequelize('books', '', '', {
        dialect: 'sqlite',
        logging: Logger.database,
        storage: process.env.DB_FILE,
        operatorsAliases: false
      });

      db.authenticate().then(() => {
        resolve(db);
      }).catch(err => {
        reject(err);
      });
    });
  }
}