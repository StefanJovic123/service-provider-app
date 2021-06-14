'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      firstName: 'Stefan',
      lastName: 'Jovic',
      password: '$2b$10$zxwXG4BQn0QJ/HvzE74zk.GVMjOfUaBqX1k8tm8zQphjbYiYur88a',
      email: 'stefan@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
