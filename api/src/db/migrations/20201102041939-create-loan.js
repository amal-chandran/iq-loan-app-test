'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tenure: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('NEW', 'REJECTED', 'APPROVED'),
        defaultValue: 'NEW',
      },
      status_dates: {
        type: Sequelize.JSONB,
        defaultValue: {
          new: new Date().toISOString(),
          rejected: null,
          approved: null,
        },
      },
      interest: {
        type: Sequelize.DECIMAL,
      },
      principal_amount: {
        type: Sequelize.BIGINT,
      },
      interest_type: {
        type: Sequelize.ENUM('REDUCING', 'FIXED'),
        defaultValue: 'FIXED',
      },
      createdby: {
        type: Sequelize.INTEGER,
      },
      createdfor: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Loans');
  },
};
