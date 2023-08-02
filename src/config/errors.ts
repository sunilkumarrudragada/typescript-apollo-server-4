/**
 * this file consists of all the errors of this service
 * code will be useful in frontend for error handling so don't change codes
 * status will be like rest api status which we will send in graphqlerror extensions
*/
export default {
  userExistsError: {
    code: 11111,
    message: 'user already exists with this email',
    status: 400,
  },
  userNotFoundError: {
    code: 11112,
    message: 'user not found',
    status: 404,
  },
  authError: {
    code: 11113,
    message: 'user entered wrong email or password',
    status: 401,
  },
};
