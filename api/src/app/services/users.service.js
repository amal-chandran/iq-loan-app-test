import BaseService from './base.service';
import sQuery from 'sequelice-query';
import { Users, Address } from './../models';

export default class UsersService extends BaseService {
  constructor(model, includes) {
    super(model, includes);
  }
}
