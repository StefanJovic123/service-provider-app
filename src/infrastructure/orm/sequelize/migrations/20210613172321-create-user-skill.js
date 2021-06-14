const { DB_TYPES: DataTypes } = require('../types');
const commonFields = require('../commonFields');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('userSkills', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.ID,
      },
      userId: {
        type: DataTypes.ID,
        allowNull: false
      },
      skillId: {
        type: DataTypes.ID,
        allowNull: false
      },
      experience: {
        type: DataTypes.INT64,
        defaultValue: 1
      },
      ...commonFields
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('userSkills');
  }
};
