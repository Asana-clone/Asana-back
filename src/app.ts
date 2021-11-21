import * as express from 'express';
import Routes from './routes/index';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.router();
  }
  private router(): void {
    this.app.use('/', Routes);
  }
  public getInstance(): express.Application {
    return this.app;
  }
}

export default new Server();
