import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const NODE_ENV = process.env.NODE_ENV;

export const JWT_KEY = process.env.JWT_KEY;
export const SALT_ROUNDS = 10;

export const APP_BASE = path.resolve(__dirname, '..', '..');
export const APP_LOGS = path.resolve(APP_BASE, 'logs');
export const APP_UPLOADS = path.resolve(APP_BASE, 'uploads');

export const APP_PORT = process.env.APP_PORT;
export const APP_URL = process.env.APP_URL || `http://localhost:${APP_PORT}`;
export const APP_UPLOADS_URL = `${APP_URL}/uploads/`;
export const APP_ASSETS_URL = `${APP_URL}/assets/`;
