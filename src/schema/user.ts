import gql from 'graphql-tag';

export default gql`
  extend type Mutation {
    signUp(username: String! email: String! password: String!): TokenType
    signIn(email: String! password: String!): TokenType
  }

  type TokenType {
    success: Boolean!
    accessToken: String!
    accessTokenExpiresAt: Date!
    refreshToken: String!
    refreshTokenExpiresAt: Date!
  }
`;
