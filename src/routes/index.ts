import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.send('hi');
});

export default router;
// export default class Routes {
//   private router: express.Router;

//   constructor() {
//     this.router = express.Router();
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.get(
//       '/',
//       async (req: Request, res: Response, next: NextFunction) => {
//         res.send('hi');
//       }
//     );
//   }
// }
