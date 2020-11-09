import { ForbiddenError } from '@casl/ability';
import createError from 'http-errors';

export default function errorHandle(error, req, res, next) {
  if (createError.isHttpError(error)) {
    res
      .status(error.statusCode)
      .send({ success: false, error: { message: error.message } });
  } else if (error instanceof ForbiddenError) {
    res.status(403).send({ success: false, error: { message: error.message } });
  } else {
    res
      .status(400)
      .send({
        success: false,
        error: { message: error.message, stack: error.stack },
      });
  }
}
