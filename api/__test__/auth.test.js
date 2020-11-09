import app from '../src/app';
import request from 'supertest';

test('should love', async () => {
  const response = await request(app).get('/api/v1/auth/whoami').send();
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ success: true, data: 'Hello whoami' });
});

const newUserData = {
  name: 'Amal Chandran',
  email: 'amalchandrandev@gmail.com',
  password: '#adevofficial',
};

describe('Register API end point', () => {
  // it('should create a new user account', async () => {
  //   const response = await request(app)
  //     .post('/api/v1/auth/register')
  //     .send(newUserData);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('success', true);
  //   expect(response.body).toHaveProperty('data.token');
  //   expect(response.body).toHaveProperty('data.user.name', newUserData.name);
  //   expect(response.body).toHaveProperty('data.user.email', newUserData.email);
  //   expect(response.body).toHaveProperty('data.user.role', 'customer');
  // });

  it('should fail to create a new user account when already existing email is given', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(newUserData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty(
      'error.message',
      'Email is already registered'
    );
  });

  it('should validate email address before registration', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ ...newUserData, email: 'test' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty(
      'error.message',
      'Email must be a valid email'
    );
  });
});

describe('Login API end point', () => {
  it('should login successfully when email and password are correct', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'amalchandrandev@gmail.com',
      password: '#adevofficial',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data.token');
    expect(response.body).toHaveProperty('data.user.name', newUserData.name);
    expect(response.body).toHaveProperty('data.user.email', newUserData.email);
    expect(response.body).toHaveProperty('data.user.role', 'customer');
  });

  it('should fail when email id is not valid', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'amalchandra@ndev@gmail.com',
      password: '#adevofficial',
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
      email: 'amalchandrandev@gmail.com',
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
      password: '#adevofficial',
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
      email: 'amalchandrandev@gmail.com',
      password: '#adevofficial123',
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
      email: 'amal@gmail.com',
      password: '#adevofficial',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty(
      'error.message',
      'Invalid Credentials'
    );
  });
});
