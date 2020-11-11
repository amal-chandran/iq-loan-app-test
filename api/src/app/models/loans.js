'use strict';
const { Model, DataTypes } = require('sequelize');

const Version = require('sequelize-version');

module.exports = (sequelize) => {
  class Loans extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        as: 'createdBy',
        foreignKey: 'createdby',
      });
      this.belongsTo(models.Users, {
        as: 'createdFor',
        foreignKey: 'createdfor',
      });
    }
    static versionsModel() {
      return new Version(this);
    }
  }

  Loans.init(
    {
      tenure: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('NEW', 'REJECTED', 'APPROVED'),
        defaultValue: 'NEW',
      },
      status_dates: {
        type: DataTypes.JSONB,
        defaultValue: {
          new: new Date().toISOString(),
          rejected: null,
          approved: null,
        },
      },
      interest: DataTypes.DECIMAL,
      principal_amount: DataTypes.BIGINT,
      interest_type: {
        type: DataTypes.ENUM('REDUCING', 'FIXED'),
        defaultValue: 'FIXED',
      },
    },
    {
      sequelize,
      modelName: 'loans',
    }
  );

  return Loans;
};
