import GraphQLJSON from 'graphql-type-json';
import pkg from 'graphql-iso-date';
const { GraphQLDateTime } = pkg;

// import remaining resolvers

const customScalarResolver = {
  Date: GraphQLDateTime,
  JSON: GraphQLJSON,
};

export default [
  customScalarResolver
]
