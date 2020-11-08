'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY, SALT_ROUNDS } = require('../../configs/app');
const { Model } = require('sequelize');
const { pick } = require('lodash');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    async setPassword(password) {
      this.password = await bcrypt.hash(password, SALT_ROUNDS);
    }

    async comparePassword(passwordPlain) {
      return await bcrypt.compare(passwordPlain, this.password);
    }

    generateJWToken() {
      return new Promise((resolve, reject) => {
        jwt.sign(
          { user: pick(this, ['id', 'name', 'role', 'email']) },
          JWT_KEY,
          {},
          function (err, token) {
            if (err) {
              reject(err);
            }
            resolve(token);
          }
        );
      });
    }
  }

  Users.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },

      role: {
        type: DataTypes.STRING,
        defaultValue: 'customer',
      },

      password: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      sequelize,
      modelName: 'users',
    }
  );

  Users.associate = function (models) {
    // associations can be defined here
  };

  return Users;
};
