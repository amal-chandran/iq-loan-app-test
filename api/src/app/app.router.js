import express from 'express';
import authRouter from './routers/auth.router';

import usersRouter from './routers/users.router';
import loansRouter from './routers/loans.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/loans', loansRouter);

export default router;
