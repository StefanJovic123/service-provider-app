const { DB_TYPES: DataTypes } = require('../types');
const commonFields = require('../commonFields');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('requestSkills', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.ID,
      },
      requestId: {
        type: DataTypes.ID,
        allowNull: false
      },
      skillId: {
        type: DataTypes.ID,
        allowNull: false
      },
      ...commonFields
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('requestSkills');
  }
};
