import { Users } from './../models';
import BaseController from './base.controller';
import UsersService from '../services/users.service';
export default class UsersController extends BaseController {
  constructor() {
    const service = new UsersService(Users);
    super(service);
  }
}
