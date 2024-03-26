import { IContext } from '../types/common.js';
import { ISignUpArgs, ISignInArgs, ITokenResp } from '../types/resolvers/user.js';
import { IUserDocument, EProvider } from '../types/models/user.js';
import { GraphQLError } from 'graphql';
import config from '../config/index.js';

export default {
  Query: {
    sampleQuery: (): string => 'Hello World!',
  },
  Mutation: {
    signUp: async(_, { username, email, password }: ISignUpArgs, { models }: IContext): Promise<ITokenResp> => {
      const oldUserRec: IUserDocument | null = await models.User.findOne({ email });

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

      return newUserRec.createToken();
    },

    signIn: async(_, { email, password }: ISignInArgs, { models }: IContext): Promise<ITokenResp> => {
      const userRec: IUserDocument | null = await models.User.findOne({ email });

      if (!userRec) {
        // handle merging of accounts for google and password providers
        throw new GraphQLError(config.errors.userNotFoundError.message, {
          extensions: {
            code: config.errors.userNotFoundError.code,
            status: config.errors.userNotFoundError.status,
          },
        });
      }

      const isValidPassword: boolean = await userRec.checkPassword(password);

      if (!isValidPassword) {
        // handle merging of accounts for google and password providers
        throw new GraphQLError(config.errors.authError.message, {
          extensions: {
            code: config.errors.authError.code,
            status: config.errors.authError.status,
          },
        });
      }

      return userRec.createToken();
    },
  },
};
