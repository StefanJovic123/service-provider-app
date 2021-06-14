import '../../../loadEnv';

export default {
  General: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    SERVER_LOCATION: process.env.SERVER_LOCATION || `http://localhost:${process.env.PORT}`,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    IS_DEV: process.env.IS_DEV,
    IS_PROD: process.env.ENVIRONMENT === 'PROD',
  },
  DB: {
    PSQL: {
      HOST: process.env.PSQL_DB_HOST,
      DATABASE: process.env.PSQL_DB_DATABASE,
      USERNAME: process.env.PSQL_DB_USERNAME,
      PASSWORD: process.env.PSQL_DB_PASSWORD,
      OPERATORS_ALIASES: process.env.PSQL_DB_OPERATORS_ALIASES || '0',
      DEFINE_TIMESTAMPS: process.env.PSQL_DB_DEFINE_TIMESTAMPS === 'true',
      USE_SSL: process.env.ENVIRONMENT === 'PROD',
      SSL_REJECT_UNAUTHORIZED: process.env.ENVIRONMENT === 'PROD',
    },
  },
  Sentry: { DSN: process.env.SENTRY_DSN },
};
