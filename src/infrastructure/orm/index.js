import Sequelize from './sequelize';

export default {
  Sequelize: async (config) => Sequelize(config),
};
