import usersData from './../mock-data/data-users';
import request from 'supertest';
import { get } from 'lodash';

export async function getAuthTokens(app) {
  const tokens = {};
  const adminResponse = await request(app).post('/api/v1/auth/login').send({
    email: usersData.admin.email,
    password: usersData.admin.password,
  });

  tokens.admin = get(adminResponse, 'body.data.token');

  const customerResponse = await request(app).post('/api/v1/auth/login').send({
    email: usersData.customer.email,
    password: usersData.customer.password,
  });

  tokens.customer = get(customerResponse, 'body.data.token');

  const agentResponse = await request(app).post('/api/v1/auth/login').send({
    email: usersData.agent.email,
    password: usersData.agent.password,
  });

  tokens.agent = get(agentResponse, 'body.data.token');
  return tokens;
}

export function tokenToHeader(token) {
  return `Bearer ${token}`;
}
