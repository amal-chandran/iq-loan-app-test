import express from 'express';
import { executeAsync } from './../../helpers/app.helper';
import UsersController from './../controllers/users.controller';
import {
  UsersSchema,
  UsersParamSchema,
  UsersUpdateSchema,
} from './../validators/users.validator';

const router = express.Router();

const UsersInstance = new UsersController();

router.get('/', executeAsync(UsersInstance.index));
router.get('/:id(\\d+)', executeAsync(UsersInstance.show, UsersParamSchema));

router.post('/', executeAsync(UsersInstance.store, UsersSchema));
router.put(
  '/:id',
  executeAsync(UsersInstance.update, [UsersUpdateSchema, UsersParamSchema])
);
router.delete('/:id', executeAsync(UsersInstance.destroy, UsersParamSchema));
export default router;
