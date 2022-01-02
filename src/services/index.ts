import * as path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const typesArray = loadFilesSync(
  path.join(__dirname, '../../src/services/**/*.graphql'),
);
const resolversArray = loadFilesSync(path.join(__dirname, '/**/*Resolvers.js'));

export const schemas = mergeTypeDefs(typesArray);
export const resolvers = mergeResolvers(resolversArray);
