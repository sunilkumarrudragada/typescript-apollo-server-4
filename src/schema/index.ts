import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import user from './user.js';

const linkSchema: DocumentNode = gql`
  scalar Date
  scalar JSON
  scalar Long

  directive @basicAuth on QUERY | MUTATION | FIELD_DEFINITION

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  user,
];
