import BaseService from './base.service';
import sQuery from 'sequelice-query';
import { Loans } from '../models';
import { assign, has, isEmpty, omit } from 'lodash';

export default class LoansService extends BaseService {
  constructor(model, includes) {
    super(model, includes);
  }
}
