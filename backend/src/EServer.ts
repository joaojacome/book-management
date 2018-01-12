import * as Express from 'express';
import * as BodyParser from 'body-parser';

import Logger from 'Lib/Logger';

/* loading routes */

import Api001 from 'Api/0.0.1/Api';

export default class EServer {
    public app: Express.Application;
    public db: any;

    public static bootstrap(conn): EServer {
        return new EServer(conn);
    }

    constructor(conn) {
        this.app = Express();
        this.config();
        this.start();
        this.db = conn;
    }

    public config() {
        this.app.use( (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
        this.app.use(BodyParser.json());
    }

    public start() {
        this.app.listen(8080, () => {
            this.registerRoutes();
        });
    }

    public registerRoutes() {
        let routes = {
            '0.0.1': Api001.bootstrap(this.db),
        };
        for(let i in routes) {
            this.app.use('/'+i, routes[i].router);
            this.app.use('/'+i, routes[i].authenticatedRouter);
        }
    }
}