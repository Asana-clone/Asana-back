import { importSchema } from 'graphql-import';

const schemas = importSchema('src/schemas/*.graphql');

export default schemas;
