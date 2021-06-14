'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('requestSkills', [{
      requestId: 1,
      skillId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 1,
      skillId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 1,
      skillId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})


    await queryInterface.bulkInsert('requestSkills', [{
      requestId: 2,
      skillId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 3,
      skillId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 3,
      skillId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    await queryInterface.bulkInsert('requestSkills', [{
      requestId: 3,
      skillId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 3,
      skillId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 3,
      skillId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})

    await queryInterface.bulkInsert('requestSkills', [{
      requestId: 4,
      skillId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 4,
      skillId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      requestId: 4,
      skillId: 6,
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
