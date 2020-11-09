import { ForbiddenError } from '@casl/ability';
import { isNil } from 'lodash';
import createError from 'http-errors';

export default (action, subject) => (req, res, next) => {
  if (isNil(req.user)) {
    throw new createError.Unauthorized();
  }

  ForbiddenError.setDefaultMessage(
    (error) => `Not Authorizated to ${error.action} ${error.subjectType}`
  );

  ForbiddenError.from(req.ability).throwUnlessCan(action, subject);
  next();
};
