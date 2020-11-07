import express from 'express';
import { executeAsync } from './../../helpers/app.helper';
import AuthController from './../controllers/auth.controller';
import { loginSchema, registerSchema } from './../validators/auth.validator';

const router = express.Router();

const AuthInstance = new AuthController();

router.get('/', executeAsync(AuthInstance.index));
router.post('/login', executeAsync(AuthInstance.login, loginSchema));
router.post('/logout', executeAsync(AuthInstance.logout));
router.post('/register', executeAsync(AuthInstance.register, registerSchema));
router.get('/whoami', executeAsync(AuthInstance.whoami));

export default router;
