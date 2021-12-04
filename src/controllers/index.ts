import { Router, Request, Response, NextFunction } from 'express';

class Index {
  public getIndex = async (req: Request, res: Response, next: NextFunction) => {
    res.send('hi');
  };
}

export default new Index();
