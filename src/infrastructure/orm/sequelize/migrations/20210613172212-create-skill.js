const { DB_TYPES: DataTypes } = require('../types');
const commonFields = require('../commonFields');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('skills', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.ID,
      },
      name: {
        type: DataTypes.STRING
      },
      ...commonFields
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('skills');
  }
};
