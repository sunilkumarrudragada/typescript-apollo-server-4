import { IContext } from '../types/common.js';
import { ISignUpArgs } from '../types/resolvers/user.js';
import { IUserDocument, EProvider } from '../types/models/user.js';
import { GraphQLError } from 'graphql';
import config from '../config/index.js';

export default {
  Mutation: {
    signUp: async(_, { username, email, password }: ISignUpArgs, { models }: IContext) => {
      const oldUserRec: IUserDocument = await models.User.findOne({ email });

      if (oldUserRec) {
        // handle merging of accounts for google and password providers
        throw new GraphQLError(config.errors.userExistsError.message, {
          extensions: {
            code: config.errors.userExistsError.code,
            status: config.errors.userExistsError.status,
          },
        });
      }

      const newUserRec: IUserDocument = await models.User.create({
        username,
        email,
        password,
        currentProvider: EProvider.Password,
        providers: [ EProvider.Password ],
      });
    },
  },
};
