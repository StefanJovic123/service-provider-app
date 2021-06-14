export const initializeModels = (modelsClasses, connection, DataTypes) =>
  Object.entries(modelsClasses).reduce((acc, [key, Model]) => {
    acc[key] = Model.init(connection, DataTypes);
    return acc;
  }, {});

export const associateModels = (unassociatedModels) =>
  Object.values(unassociatedModels).forEach(
    (model) => typeof model.associate === 'function' && model.associate(unassociatedModels),
  );

export const initializeOrm = (modelClasses, dbConnection, DataTypes) => {
  const models = initializeModels(modelClasses, dbConnection, DataTypes);

  associateModels(models);

  return {
    models,
    connection: dbConnection,
  };
};
