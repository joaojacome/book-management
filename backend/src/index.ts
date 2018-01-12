process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();

import * as Sequelize from 'sequelize';
import { config as dotenv } from 'dotenv';

import Logger from 'Lib/Logger';
import Database from 'Database';
import EServer from 'EServer';

dotenv();

Database.bootstrap()
  .then((db: Sequelize.Sequelize) => {
    EServer.bootstrap(db);
  })
  .catch((error) => {
    Logger.error('Error initializing database');
    process.exit(1);
  });