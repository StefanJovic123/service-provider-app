const Sequelize = require('sequelize');

const APPLICATION_SCOPES = {
  MOBILE: 'mobile',
  BUSINESS_WEB: 'business_web',
  BACKOFFICE_FRONTEND: 'backoofice',
  SINGLE_API: 'single_api',
};

const ACCOUNT_TYPES = {
  BASE: 'Base',
  PERSONAL: 'Personal',
  BUSINESS: 'Business',
};

const PRODUCT_TYPES = {
  P: 'P',
  D: 'D',
  C: 'C',
  L: 'L',
  S: 'S',
};

// eslint-disable-next-line import/prefer-default-export
const DB_TYPES = {
  // Primitives
  INT8: Sequelize.TINYINT,
  INT16: Sequelize.SMALLINT,
  INT32: Sequelize.INTEGER,
  INT64: Sequelize.BIGINT,
  STRING: Sequelize.STRING,
  BOOLEAN: Sequelize.BOOLEAN,
  TEXT: Sequelize.TEXT,
  VIRTUAL: Sequelize.VIRTUAL,
  TIMESTAMP: Sequelize.NOW,
  DATEONLY: Sequelize.DATEONLY,
  DECIMAL: Sequelize.DECIMAL,
  DATE: Sequelize.DATE,
  ENUM: Sequelize.ENUM,
  // Complex and derived types
  ID: Sequelize.INTEGER(20),
  BALANCE: Sequelize.DECIMAL(10, 4),
  AMOUNT: Sequelize.DECIMAL(9, 2),
  FEE: Sequelize.DECIMAL(9, 4),
  DOUBLE20P2: Sequelize.DOUBLE(20, 2),
  DOUBLE20P4: Sequelize.DOUBLE(20, 4),
  DOUBLE20P6: Sequelize.DOUBLE(20, 6),
  PRECISEAMOUNT: Sequelize.DECIMAL(15, 2),
  CARDCONVERSIONRATE: Sequelize.DECIMAL(8, 3),
  JSON: Sequelize.JSON,
  STRING1: Sequelize.STRING(1),
  STRING3: Sequelize.STRING(3),
  STRING4: Sequelize.STRING(4),
  STRING15: Sequelize.STRING(15),
  STRING16: Sequelize.STRING(16),
  STRING32: Sequelize.STRING(32),
  STRING64: Sequelize.STRING(64),
  STRING128: Sequelize.STRING(128),
  STRING200: Sequelize.STRING(191),
  STRING256: Sequelize.STRING(256),
  LONGTEXT: Sequelize.TEXT('long'),
  MEDIUMTEXT: Sequelize.TEXT('medium'),
  APPSCOPE: Sequelize.ENUM(
    APPLICATION_SCOPES.BACKOFFICE_FRONTEND,
    APPLICATION_SCOPES.BUSINESS_WEB,
    APPLICATION_SCOPES.SINGLE_API,
    APPLICATION_SCOPES.MOBILE,
  ),
  CHAR1: Sequelize.CHAR(1),
  CHAR3: Sequelize.CHAR(3),
  ACCOUNT_TYPES: Sequelize.ENUM(ACCOUNT_TYPES.BASE, ACCOUNT_TYPES.PERSONAL, ACCOUNT_TYPES.BUSINESS),
  PRODUCT_TYPES: Sequelize.ENUM(
    PRODUCT_TYPES.C,
    PRODUCT_TYPES.D,
    PRODUCT_TYPES.L,
    PRODUCT_TYPES.P,
    PRODUCT_TYPES.S,
  ),
};

module.exports = {
  APPLICATION_SCOPES,
  DB_TYPES,
  ACCOUNT_TYPES,
  PRODUCT_TYPES,
};
