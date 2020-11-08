import express from 'express';
import { executeAsync } from './../../helpers/app.helper';
import UsersController from './../controllers/users.controller';
import {
  UsersSchema,
  UsersParamSchema,
  UsersUpdateSchema,
} from './../validators/users.validator';
import protect from './../middlewares/protect';
const router = express.Router();

const UsersInstance = new UsersController();

router.get('/', protect('list', 'Users'), executeAsync(UsersInstance.index));
router.get(
  '/picker',
  protect('list', 'Users'),
  executeAsync(UsersInstance.picker)
);
router.get(
  '/:id(\\d+)',
  protect('show', 'Users'),
  executeAsync(UsersInstance.show, UsersParamSchema)
);

router.post(
  '/',
  protect('create', 'Users'),
  executeAsync(UsersInstance.store, UsersSchema)
);
router.put(
  '/:id',
  protect('update', 'Users'),
  executeAsync(UsersInstance.update, [UsersUpdateSchema, UsersParamSchema])
);
router.delete(
  '/:id',
  protect('delete', 'Users'),
  executeAsync(UsersInstance.destroy, UsersParamSchema)
);
export default router;
