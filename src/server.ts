import server from './app';
import { schemas, resolvers } from './services';
import 'reflect-metadata';
import dbc from './db';
dbc.connection();

server(schemas, resolvers);
