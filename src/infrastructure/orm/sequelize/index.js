import createPSQLDB from './models';

const DEFAULT_CONFIGURATIONS = {
  PSQL: { dialect: 'postgres' },
};

const resolveConfiguration = (type, config = {}) => {
  if (!type) {
    return {};
  }

  const dbConfig = config[type];
  if (!dbConfig) {
    return DEFAULT_CONFIGURATIONS[type];
  }

  // local docker postgres instance does not work without this
  let dialectOptions;
  if (process.env.ENVIRONMENT === 'PROD') {
    dialectOptions = {
      ssl: {
        require: dbConfig.USE_SSL,
        rejectUnauthorized: dbConfig.SSL_REJECT_UNAUTHORIZED,
      },
    };
  }

  return {
    database: dbConfig.DATABASE,
    username: dbConfig.USERNAME,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT || DEFAULT_CONFIGURATIONS[type].dialect,
    dialectOptions,
    define: { timestamps: dbConfig.DEFINE_TIMESTAMPS },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
};

export default async (config) => ({
  PSQLDB: await createPSQLDB(resolveConfiguration('PSQL', config)),
});
