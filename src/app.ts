import * as express from 'express';
import { GraphQLError, GraphQLFormattedError, DocumentNode } from 'graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { IResolvers } from '@graphql-tools/utils';
import { ApolloServer } from 'apollo-server-express';
import { getUser } from './services/users/utils';
import * as http from 'http';
import * as morgan from 'morgan';
import 'dotenv/config';

interface e extends GraphQLFormattedError {
  readonly statuscode: number;
}

const formatError = (err: GraphQLError): e => {
  console.error('--- GraphQL Error --w-');
  console.error('Path:', err.path);
  console.error('Message:', err.message);
  console.error('Code:', err.extensions.code);
  console.error('Original Error', err.originalError);
  let statuscode = 500;
  console.error(err);
  //에러 커스텀 어떻게 하실지 몰라서 일단 다 써놨습니다..
  switch (err.extensions.code) {
    case 'GRAPHQL_PARSE_FAILED':
      statuscode = 500;
      break;
    case 'GRAPHQL_VALIDATION_FAILED':
      statuscode = 500;
      break;
    case 'BAD_USER_INPUT':
      statuscode = 400;
      break;
    case 'UNAUTHENTICATED':
      statuscode = 401;
      break;
    case 'FORBIDDEN':
      statuscode = 401;
      break;
    case 'PERSISTED_QUERY_NOT_FOUND':
      statuscode = 500;
      break;
    case 'PERSISTED_QUERY_NOT_SUPPORTED':
      statuscode = 500;
      break;
    case 'INTERNAL_SERVER_ERROR':
      statuscode = 500;
      break;
    default:
      statuscode = 500;
  }
  return {
    statuscode,
    message: err.message,
  };
};

async function startApolloServer(
  typeDefs: DocumentNode | Array<DocumentNode> | string | Array<string>,
  resolvers: IResolvers | Array<IResolvers>,
) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: async (ctx) => {
      if (ctx.req) {
        return { loggedInUser: await getUser(ctx.req.headers.authorization) };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(morgan('dev'));

  await server.start();

  server.applyMiddleware({ app });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve),
  );

  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`,
  );
}

export default startApolloServer;
