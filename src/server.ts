import * as express from 'express';
import Server from './app';
import 'dotenv/config';
const port = +process.env.PORT;

const app: express.Application = Server.getInstance();

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
