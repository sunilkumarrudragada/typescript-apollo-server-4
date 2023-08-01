export default {
  NODE_ENV: process.env.NODE_ENV,
  database: {
    dbUri: process.env.DATABASE_URL,
    dbName: process.env.DB_NAME,
  },
};
