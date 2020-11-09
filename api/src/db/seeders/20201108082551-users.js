'use strict';

const password = '$2b$10$RFNma8l8oMYnDAqKI6HCi.rvkp17bGRsAFGpWlemGi4NOwqNFvW7O';

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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
