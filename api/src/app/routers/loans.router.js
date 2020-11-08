import express from 'express';
import { executeAsync } from '../../helpers/app.helper';
import LoansController from '../controllers/loans.controller';
import {
  LoansSchema,
  LoansParamSchema,
  LoansUpdateSchema,
} from '../validators/loans.validator';
import protect from '../middlewares/protect';
const router = express.Router();

const LoansInstance = new LoansController();

router.get('/', protect('list', 'Loans'), executeAsync(LoansInstance.index));
router.get(
  '/:id(\\d+)',
  protect('show', 'Loans'),
  executeAsync(LoansInstance.show, LoansParamSchema)
);

router.post(
  '/',
  protect('create', 'Loans'),
  executeAsync(LoansInstance.store, LoansSchema)
);
router.put(
  '/:id',
  protect('update', 'Loans'),
  executeAsync(LoansInstance.update, [LoansUpdateSchema, LoansParamSchema])
);
router.delete(
  '/:id',
  protect('delete', 'Loans'),
  executeAsync(LoansInstance.destroy, LoansParamSchema)
);
export default router;
