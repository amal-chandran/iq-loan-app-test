import express from 'express';
import authRouter from './routers/auth.router';

import usersRouter from './routers/users.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
