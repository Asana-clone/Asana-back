import server from './app.js';
import resolvers from './resolvers/index.js';
import schemas from './schemas/index.js';

server(schemas, resolvers);
