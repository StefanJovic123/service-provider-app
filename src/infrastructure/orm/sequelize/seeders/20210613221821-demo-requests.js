'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('requests', [{
      title: 'Python Full Stack Project',
      description: 'Des 1',
      dateFrom: '2021-03-20',
      dateTo: '2021-10-20',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'JavaScript Full Stack Project',
      description: 'Desc 2',
      dateFrom: '2021-04-20',
      dateTo: '2021-10-20',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'React.js Frontend App - Awesome one',
      description: 'Desc 3',
      dateFrom: '2021-04-20',
      dateTo: '2022-10-20',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Node.js backend Project - Very interesting',
      description: 'Desc 4',
      dateFrom: '2021-10-04',
      dateTo: '2030-03-21',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
