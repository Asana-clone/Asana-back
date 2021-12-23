import server from './app.js';
import { schemas, resolvers } from './services/index.js';

server(schemas, resolvers);
