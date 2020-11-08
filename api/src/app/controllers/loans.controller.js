import { Loans, Users } from './../models';
import BaseController from './base.controller';
import LoansService from '../services/loans.service';

export default class LoansController extends BaseController {
  constructor() {
    const service = new LoansService(Loans, [
      { model: Users, as: 'createdBy' },
      { model: Users, as: 'createdFor' },
    ]);
    super(service);
  }

  setStatus = async ({ id, status }, req) => {
    return await this.service.setStatus(id, status, req.ability);
  };

  getParams = (data, req) => ({
    ...data,
    createdby: req.userId,
  });
}
