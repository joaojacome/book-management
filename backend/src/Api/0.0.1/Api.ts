import * as Express from 'express';
import * as BodyParser from 'body-parser';
import * as Sequelize from 'sequelize';

import Logger from 'Lib/Logger';

import ControllerLoader from './ControllerLoader';
import ModelLoader from './ModelLoader';
import SchemaLoader from './SchemaLoader';

export default class Api {

  public router: Express.Router;
  public authenticatedRouter: Express.Router;
  public db: Sequelize.Sequelize;
  public controllers: any;
  public models: any;
  public schemas: any;

  public static bootstrap(db: Sequelize.Sequelize): Api {
    return new Api(db);
  }

  constructor(db: any) {
    Logger.info("Initializing router");
    this.router = Express.Router();
    this.authenticatedRouter = Express.Router();
    this.db = db;
    this.models = ModelLoader(db);
    this.schemas = SchemaLoader(db);
    this.controllers = ControllerLoader(db, this.models, this.schemas);
    this.setupPublicRoutes();
    this.setupAutheticatedRoutes();
  }
    
  /**
   * Authenticated Routes
   * 
   * In real-world usage, this method would instantiate all authenticated
   * routes, plus validate all requests internally by a middleware.
   * 
   * But, for demo purposes, all book methods will be available without authentication.
   */
  public setupAutheticatedRoutes() {
    this.authenticatedRouter
      .use(BodyParser.json())
      .use((req, res, next) => {
        if (req.method == 'OPTIONS'){
          //next();
          res.send();
          return;
        }
        let data = req.body;
        res.locals.data = data;
        
        //implement real authentication here
        let authenticated = true;

        if (!authenticated) {
          res.send({ 'invalid': true });
        } else {
          next();
        }
      })
      .use('/books', this.controllers.BookController.graphQL)
  }

  /**
   * Public Routes
   */
  public setupPublicRoutes() {
    //Login route would be available without authentication

    // this.router.post('/login', (req, res) => {
    //   this.controllers.UserController.login(req, res);
    // });
  }
    
}
