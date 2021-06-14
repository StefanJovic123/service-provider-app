const { DB_TYPES: DataTypes } = require('./types');

module.exports = {
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.TIMESTAMP,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.TIMESTAMP,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
};
