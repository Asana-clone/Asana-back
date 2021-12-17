import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { sequelize } from './models/index.js';
import { getUser } from './services/users/utils.js'
import express from 'express';
import http from 'http';
import morgan from 'morgan';

const formatError = (err) => {
  console.error("--- GraphQL Error ---");
  console.error("Path:", err.path);
  console.error("Message:", err.message);
  console.error("Code:", err.extensions.code);
  console.error("Original Error", err.originalError);
  return err;
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async (ctx) => {
      if (ctx.req) {
        return { loggedInUser: await getUser(ctx.req.headers.token) };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(morgan('dev'));

  sequelize
    .sync({ force: false })
    .then(() => console.log('데이터베이스 연결 성공!'))
    .catch((err) => console.error(err));

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

export default startApolloServer;
