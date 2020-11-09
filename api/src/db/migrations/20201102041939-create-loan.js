'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Loans', {
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
        type: Sequelize.STRING,
      },
      status_dates: {
        type: Sequelize.JSONB,
      },
      interest: {
        type: Sequelize.INTEGER,
      },
      principal_amount: {
        type: Sequelize.BIGINT,
      },
      interest_type: {
        type: Sequelize.STRING,
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
