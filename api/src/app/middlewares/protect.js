import { ForbiddenError } from '@casl/ability';
import { isNil } from 'lodash';

export default (action, subject) => (req, res, next) => {
  if (isNil(req.user)) {
    throw new Error('Not Authorizated Request');
  }

  ForbiddenError.from(req.ability).throwUnlessCan(action, subject);
  next();
};
