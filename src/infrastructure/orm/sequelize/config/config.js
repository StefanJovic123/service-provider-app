require('dotenv').config();

let dialectOptions;
if (process.env.ENVIRONMENT === 'PROD') {
  dialectOptions = {
    ssl: {
      require: true,
    },
  };
}

const db = {
  username: process.env.PSQL_USERNAME || 'root',
  password: process.env.PSQL_DB_PASSWORD || 'root',
  database: process.env.PSQL_DB_DATABASE || 'db_name',
  host: process.env.PSQL_DB_HOST || '127.0.0.1',
  dialect: process.env.PSQL_DB_DIALECT || 'postgres',
  operatorsAliases: process.env.PSQL_DB_OPERATORS_ALIASES || '0',
  define: {
    timestamps: process.env.PSQL_DB_DEFINE_TIMESTAMPS === 'true',
  },
  dialectOptions,
};

module.exports = {
  development: db,
  testing: db,
  production: db,
};
