'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('skills', [{
     name: 'Python',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'JavaScript',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'React.js',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Node.js',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Java',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Java Spring',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'AWS',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Teraform',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Express',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'PHP',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Ruby On Rails',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     name: 'Ruby',
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
