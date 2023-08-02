import GraphQLJSON from 'graphql-type-json';
import pkg from 'graphql-iso-date';
import user from './user.js';
const { GraphQLDateTime } = pkg;

// import remaining resolvers

const customScalarResolver = {
  Date: GraphQLDateTime,
  JSON: GraphQLJSON,
};

export default [
  customScalarResolver,
  user,
];
