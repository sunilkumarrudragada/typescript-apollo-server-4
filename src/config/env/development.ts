export default {
  NODE_ENV: process.env.NODE_ENV,
  database: {
    dbUri: process.env.DATABASE_URL,
    dbName: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenexpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  },
};
