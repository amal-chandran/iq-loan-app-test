'use strict';

const password = '$2b$10$srNvBruVAImmrZYu8F1p6ORNYq4OSjW1w2TwsshkqPMqPoRr/ozy6';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin',
          email: 'amal-admin@gmail.com',
          password,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Agent',
          email: 'amal-agent@gmail.com',
          password,
          role: 'agent',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Customer',
          email: 'amal-customer@gmail.com',
          password,
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Customer',
          email: 'amal-customer-2@gmail.com',
          password,
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
