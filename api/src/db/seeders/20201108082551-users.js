'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordRaw = '#adevofficial';
    const password = await bcrypt.hash(passwordRaw, 10);

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
          name: 'Customer 2',
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
