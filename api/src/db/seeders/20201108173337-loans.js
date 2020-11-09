'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // console.log(new Sequelize.JSONB());
    await queryInterface.bulkInsert(
      'loans',
      [
        {
          tenure: 24,
          status: 'APPROVED',
          status_dates: {
            new: new Date().toISOString(),
            approved: new Date().toISOString(),
            rejected: new Date().toISOString(),
          },
          interest: 12,
          principal_amount: 10000,
          interest_type: 'FIXED',
          createdby: 2,
          createdfor: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tenure: 42,
          status: 'NEW',
          status_dates: {
            new: new Date().toISOString(),
            approved: new Date().toISOString(),
            rejected: new Date().toISOString(),
          },
          interest: 15,
          principal_amount: 10000,
          interest_type: 'FIXED',
          createdby: 2,
          createdfor: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tenure: 24,
          status: 'NEW',
          status_dates: {
            new: new Date().toISOString(),
            approved: new Date().toISOString(),
            rejected: new Date().toISOString(),
          },
          interest: 14,
          principal_amount: 120000,
          interest_type: 'FIXED',
          createdby: 2,
          createdfor: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tenure: 22,
          status: 'NEW',
          status_dates: {
            new: new Date().toISOString(),
            approved: new Date().toISOString(),
            rejected: new Date().toISOString(),
          },
          interest: 14,
          principal_amount: 120000,
          interest_type: 'FIXED',
          createdby: 2,
          createdfor: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tenure: 22,
          status: 'NEW',
          status_dates: {
            new: new Date().toISOString(),
            approved: new Date().toISOString(),
            rejected: new Date().toISOString(),
          },
          interest: 14,
          principal_amount: 120000,
          interest_type: 'FIXED',
          createdby: 2,
          createdfor: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
      { status_dates: { type: new Sequelize.JSONB() } }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('loans', null, {});
  },
};
