import * as express from 'express';
import Routers from './interfaces/router.interface';
import indexRouter from './routers';

class Server {
  public app: express.Application;

  constructor(routers: Routers[]) {
    this.app = express();
    this.initializerouter(routers);
  }

  private initializerouter(routers: Routers[]) {
    routers.forEach((router) => {
      this.app.use('/', router.router);
    });
  }

  public getInstance(): express.Application {
    return this.app;
  }
}

export default new Server([new indexRouter()]);
