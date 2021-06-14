const { DB_TYPES: DataTypes } = require('../types');
const commonFields = require('../commonFields');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('requests', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.ID,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.LONGTEXT,
        allowNull: false
      },
      dateFrom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateTo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      assignedTo: {
        type: DataTypes.ID,
        allowNull: true
      },
      ...commonFields
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('requests');
  }
};
