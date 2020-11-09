import isEmpty from 'lodash/isEmpty';
import startsWith from 'lodash/startsWith';
import replace from 'lodash/replace';
import trim from 'lodash/trim';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../configs/app';
import { defineAbilityFor } from './../../helpers/access-control.helper';

export default function (req, res, next) {
  let token = req.get('Authorization');

  if (!isEmpty(token)) {
    if (startsWith('Bearer', token)) {
      throw new Error('Not Valid Authorization Token');
    }

    token = trim(replace(token, 'Bearer', ''));

    jwt.verify(token, JWT_KEY, (err, { user }) => {
      if (err) next(err);

      req.user = user;
      req.userId = user.id;
      req.ability = defineAbilityFor(user);

      next();
    });
  } else {
    req.user = null;
    req.userId = null;
    req.ability = null;
    next();
  }
}
