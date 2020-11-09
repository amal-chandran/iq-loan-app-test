import app from '../src/app';
import request from 'supertest';
import faker from 'faker';
import { get, pick, toPairs } from 'lodash';
import { response } from 'express';
import { getAuthTokens, tokenToHeader } from './helpers/auth.helper';
import queryString from 'query-string';

describe('Users API', () => {
  let userTestData;

  let predefinedUsers = {
    admin: 1,
    agent: 2,
    customer: 3,
  };

  let pairUsers = toPairs(predefinedUsers);

  let nonPermitedList = [
    [
      'agent',
      pairUsers.filter(([userRole, userId]) =>
        ['admin', 'agent'].includes(userRole)
      ),
    ],
    ['customer', pairUsers],
  ];

  let permitedList = [
    [
      'agent',
      pairUsers.filter(([userRole, userId]) => ['customer'].includes(userRole)),
    ],
    ['admin', pairUsers],
  ];

  beforeAll(async () => {
    userTestData = {
      auth: await getAuthTokens(app),
      predefinedUsers,
      extraUserData: {
        another_email: faker.internet.email(),
        another_password: faker.internet.password(),
        invalid_email: faker.internet.email().concat('@'),
      },
    };
  });

  beforeEach(() => {
    userTestData.newTestUser = {
      admin: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'admin',
      },
      agent: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'agent',
      },
      customer: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'customer',
      },
    };
  });

  describe('Users List API', () => {
    it('should fail to get list of users when no auth header is set', async () => {
      const response = await request(app).get('/api/v1/users').send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    it('should fail to get list of users when customer access', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', tokenToHeader(userTestData.auth.customer))
        .send();

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Not Authorizated to list Users'
      );
    });

    it('should get list of users when agent access', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', tokenToHeader(userTestData.auth.agent))
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });

    it('should get list of users when admin access', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .set('Authorization', tokenToHeader(userTestData.auth.admin))
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });

    it('should able to filter list of users when admin access', async () => {
      const response = await request(app)
        .get(
          `/api/v1/users?${queryString.stringify({
            filtered: '[{"id":"in$id", "value":[1,2,3]}]',
          })}`
        )
        .set('Authorization', tokenToHeader(userTestData.auth.admin))
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(get(response.body, 'data')).toHaveLength(3);
    });

    it('should able to filter list of users when agent access', async () => {
      const response = await request(app)
        .get(
          `/api/v1/users?${queryString.stringify({
            filtered: '[{"id":"in$id", "value":[1,2,3]}]',
          })}`
        )
        .set('Authorization', tokenToHeader(userTestData.auth.agent))
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(get(response.body, 'data')).toHaveLength(1);
    });
  });

  describe('Users Show API end point', () => {
    it('should fail to get one of the user when no auth header is set', async () => {
      const response = await request(app)
        .get(`/api/v1/users/${userTestData.predefinedUsers.customer}`)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const [testingRole, selectedPairUsers] of nonPermitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should fail to get one of the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .get(`/api/v1/users/${userId}`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send();

          expect(response.status).toBe(403);
          expect(response.body).toHaveProperty('success', false);
          expect(response.body).toHaveProperty(
            'error.message',
            'Not Authorizated to show Users'
          );
        });
      }
    }

    for (const [testingRole, selectedPairUsers] of permitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should get one of the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .get(`/api/v1/users/${userId}`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send();

          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('success', true);
          expect(response.body).toHaveProperty('data');
        });
      }
    }
  });

  describe('Users Create API end point', () => {
    it('should fail to create a user when no auth header is set', async () => {
      const response = await request(app)
        .post(`/api/v1/users`)
        .send(userTestData.newTestUser.customer);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const [testingRole, selectedPairUsers] of nonPermitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should fail to create the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .post(`/api/v1/users`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send(userTestData.newTestUser[userRole]);

          expect(response.status).toBe(403);
          expect(response.body).toHaveProperty('success', false);
          expect(response.body).toHaveProperty(
            'error.message',
            'Not Authorizated to create Users'
          );
        });
      }
    }

    for (const [testingRole, selectedPairUsers] of permitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should able to create user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .post(`/api/v1/users`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send(userTestData.newTestUser[userRole]);

          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('success', true);
          expect(response.body).toHaveProperty('data');
        });
      }
    }
  });

  describe('Users Edit API end point', () => {
    beforeEach(async () => {
      const listNewUsers = toPairs(userTestData.newTestUser);
      for (const [userRole, userData] of listNewUsers) {
        const response = await request(app)
          .post(`/api/v1/users`)
          .set('Authorization', tokenToHeader(userTestData.auth.admin))
          .send(userData);

        userTestData.newTestUser[userRole].id = response.body.data.id;
      }
    });

    it('should fail to edit one of the user when no auth header is set', async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userTestData.predefinedUsers.customer}`)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const [testingRole, selectedPairUsers] of nonPermitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should fail to edit one of the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .put(`/api/v1/users/${userTestData.newTestUser[userRole].id}`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send(userTestData.newTestUser[userRole]);

          expect(response.status).toBe(403);
          expect(response.body).toHaveProperty('success', false);
          expect(response.body).toHaveProperty(
            'error.message',
            'Not Authorizated to edit Users'
          );
        });
      }
    }

    for (const [testingRole, selectedPairUsers] of permitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should edit one of the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .put(`/api/v1/users/${userTestData.newTestUser[userRole].id}`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send(userTestData.newTestUser[userRole]);

          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('success', true);
          expect(response.body).toHaveProperty('data');
        });
      }
    }
  });

  describe('Users Delete API end point', () => {
    beforeEach(async () => {
      const listNewUsers = toPairs(userTestData.newTestUser);
      for (const [userRole, userData] of listNewUsers) {
        const response = await request(app)
          .post(`/api/v1/users`)
          .set('Authorization', tokenToHeader(userTestData.auth.admin))
          .send(userData);

        userTestData.newTestUser[userRole].id = response.body.data.id;
      }
    });

    it('should fail to delete one of the user when no auth header is set', async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userTestData.predefinedUsers.customer}`)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const [testingRole, selectedPairUsers] of nonPermitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should fail to delete one of the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .delete(`/api/v1/users/${userTestData.newTestUser[userRole].id}`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send();

          expect(response.status).toBe(403);
          expect(response.body).toHaveProperty('success', false);
          expect(response.body).toHaveProperty(
            'error.message',
            'Not Authorizated to delete Users'
          );
        });
      }
    }

    for (const [testingRole, selectedPairUsers] of permitedList) {
      for (const [userRole, userId] of selectedPairUsers) {
        it(`should delete one of the user (${userRole}) when ${testingRole} access`, async () => {
          const response = await request(app)
            .delete(`/api/v1/users/${userTestData.newTestUser[userRole].id}`)
            .set('Authorization', tokenToHeader(userTestData.auth[testingRole]))
            .send();

          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('success', true);
          expect(response.body).toHaveProperty('data');
        });
      }
    }
  });
});
