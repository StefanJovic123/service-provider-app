const { DB_TYPES: DataTypes } = require('../types');
const commonFields = require('../commonFields');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.ID,
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      skillsSet: {
        type: DataTypes.BOOLEAN
      },
      ...commonFields
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
