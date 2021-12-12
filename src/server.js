import server from './app.js';
import userResolvers from './resolvers/users/resolvers.js';
import schemas from './schemas/index.js';

server([schemas], [userResolvers]);
