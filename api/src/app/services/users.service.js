import BaseService from './base.service';
import sQuery from 'sequelice-query';
import { Users } from './../models';
import { assign, has, isEmpty, omit } from 'lodash';

export default class UsersService extends BaseService {
  constructor(model, includes) {
    super(model, includes);
  }

  async create(data) {
    const result = await this.model.findOne({
      where: {
        email: data.email,
      },
    });

    if (!isEmpty(result)) throw new Error('Email is already registered');

    const newUser = new this.model(data);

    await newUser.setPassword(data.password);

    await newUser.save();

    return newUser;
  }

  async update(id, data) {
    let result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    result = assign(result, omit(data, ['password']));

    if (has(data, 'password')) {
      await result.setPassword(data.password);
    }

    return await result.save();
  }
}
