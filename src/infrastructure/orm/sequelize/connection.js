import { Sequelize } from 'sequelize';

export default async (config) => {
  const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    operatorsAliases: config.operatorsAliases,
    define: config.define,
  });

  try {
    await connection.authenticate();

    console.log('Connection has been established successfully.');

    return connection;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};
