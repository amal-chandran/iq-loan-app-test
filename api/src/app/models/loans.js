'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
  }

  Loan.init(
    {
      tenure: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('NEW', 'REJECTED', 'APPROVED'),
        defaultValue: 'NEW',
      },
      status_dates: {
        type: DataTypes.JSONB,
        defaultValue: { new: new Date(), rejected: null, approved: null },
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

  return Loan;
};
