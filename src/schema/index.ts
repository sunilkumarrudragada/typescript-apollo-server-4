import gql from 'graphql-tag';
import { DocumentNode } from 'graphql';
import user from './user.js'

const linkSchema: DocumentNode = gql`
  scalar Date
  scalar JSON
  scalar Long

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
  user
];
