import app from '../src/app';
import request from 'supertest';
import faker from 'faker';
import { pick } from 'lodash';

describe('Authentication API', () => {
  let authTestData;

  beforeAll(() => {
    authTestData = {
      newUserData: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
      extraUserData: {
        another_email: faker.internet.email(),
        another_password: faker.internet.password(),
        invalid_email: faker.internet.email().concat('@'),
      },
    };
  });

  describe('Register API end point', () => {
    it('should create a new user account', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(authTestData.newUserData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data.token');
      expect(response.body).toHaveProperty(
        'data.user.name',
        authTestData.newUserData.name
      );
      expect(response.body).toHaveProperty(
        'data.user.email',
        authTestData.newUserData.email
      );
      expect(response.body).toHaveProperty('data.user.role', 'customer');
    });

    it('should fail to create a new user account when already existing email is given', async () => {
      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(authTestData.newUserData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Email is already registered'
      );
    });

    it('should validate email address before registration', async () => {
      const response = await request(app).post('/api/v1/auth/register').send({
        name: authTestData.newUserData.name,
        email: authTestData.extraUserData.invalid_email,
        password: authTestData.newUserData.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Email must be a valid email'
      );
    });

    it('should validate email as required', async () => {
      const response = await request(app).post('/api/v1/auth/register').send({
        name: authTestData.newUserData.name,
        password: authTestData.newUserData.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Email is a required field'
      );
    });

    it('should validate password as required', async () => {
      const response = await request(app).post('/api/v1/auth/register').send({
        name: authTestData.newUserData.name,
        email: authTestData.newUserData.email,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Password is a required field'
      );
    });

    it('should validate name as required', async () => {
      const response = await request(app).post('/api/v1/auth/register').send({
        password: authTestData.newUserData.password,

        email: authTestData.newUserData.email,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Name is a required field'
      );
    });
  });

  describe('Login API end point', () => {
    it('should login successfully when email and password are correct', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: authTestData.newUserData.email,
        password: authTestData.newUserData.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data.token');
      expect(response.body).toHaveProperty(
        'data.user.name',
        authTestData.newUserData.name
      );
      expect(response.body).toHaveProperty(
        'data.user.email',
        authTestData.newUserData.email
      );
      expect(response.body).toHaveProperty('data.user.role', 'customer');
    });

    it('should fail when email id is not valid', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: authTestData.extraUserData.invalid_email,
        password: authTestData.newUserData.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Email must be a valid email'
      );
    });

    it('should fail when no password is provided', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: authTestData.newUserData.email,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Password is a required field'
      );
    });

    it('should fail when no email is provided', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        password: authTestData.newUserData.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Email is a required field'
      );
    });

    it('should fail with correct email & worng password ', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: authTestData.newUserData.email,
        password: authTestData.extraUserData.another_password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Invalid Credentials'
      );
    });

    it('should fail with worng  email & correct password ', async () => {
      const response = await request(app).post('/api/v1/auth/login').send({
        email: authTestData.extraUserData.another_email,
        password: authTestData.newUserData.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Invalid Credentials'
      );
    });
  });
});
