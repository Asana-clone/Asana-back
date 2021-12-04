import { Router, Request, Response, NextFunction } from 'express';
import Routers from '../interfaces/router.interface';
import Index from '../controllers/index';

class indexRouter implements Routers {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, Index.getIndex);
  }
}

export default indexRouter;
