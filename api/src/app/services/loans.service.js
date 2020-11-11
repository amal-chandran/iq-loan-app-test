import { ForbiddenError, subject } from '@casl/ability';
import { assign, isEmpty, set, toLower } from 'lodash';
import BaseService from './base.service';

export default class LoansService extends BaseService {
  constructor(model, includes) {
    super(model, includes);
  }

  async setStatus(id, status, ability) {
    let result = await this.model.findOne({
      where: { id },
      include: this.includes,
    });

    if (isEmpty(result)) throw new Error(`No ${this.model.name} found`);

    ForbiddenError.from(ability).throwUnlessCan(
      'set-status',
      subject(this.model.model_name, result)
    );

    set(result, `status_dates.${toLower(status)}`, new Date());

    result = assign(result, { status });

    return await result.save();
  }
}
