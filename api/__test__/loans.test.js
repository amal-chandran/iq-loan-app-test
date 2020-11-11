import app from '../src/app';
import request from 'supertest';
import faker from 'faker';
import { get, pick, toPairs } from 'lodash';
import { response } from 'express';
import { getAuthTokens, tokenToHeader } from './helpers/auth.helper';
import queryString from 'query-string';

describe('Loans API', () => {
  let loansTestData;

  const userRoles = ['admin', 'agent', 'customer'];
  const notPermitedToEditCreate = ['admin', 'customer'];
  const permitedToDelete = ['admin', 'agent'];
  const notPermitedToSetStatus = ['customer', 'agent'];

  const customerLoans = [
    ['customer', [1, 2, 3]],
    ['customer-2', [4, 5]],
  ];

  beforeAll(async () => {
    loansTestData = {
      auth: await getAuthTokens(app),
    };
  });

  describe('Loans List API', () => {
    it('should fail to get list of loans when no auth header is set', async () => {
      const response = await request(app).get('/api/v1/loans').send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const selectedRole of userRoles) {
      it(`should get list of loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .get('/api/v1/loans')
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
      });

      it(`should able to filter list of loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .get(
            `/api/v1/loans?${queryString.stringify({
              filtered: '[{"id":"in$id", "value":[1,2,3]}]',
            })}`
          )
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(get(response.body, 'data')).toHaveLength(3);
      });
    }

    it(`should get list of his own loans only when customer access`, async () => {
      const response = await request(app)
        .get('/api/v1/loans')
        .set('Authorization', tokenToHeader(loansTestData.auth.customer))
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('Loans Show API', () => {
    it('should fail to show one of loans when no auth header is set', async () => {
      const response = await request(app)
        .get(`/api/v1/loans/${get(customerLoans, '0.1.0')}`)
        .send();

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const selectedRole of userRoles) {
      it(`should show one of loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .get(`/api/v1/loans/${get(customerLoans, '0.1.0')}`)
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
      });
    }

    it(`should fail to show one loan of other customer when a customer access`, async () => {
      const response = await request(app)
        .get(`/api/v1/loans/${get(customerLoans, '1.1.0')}`)
        .set('Authorization', tokenToHeader(loansTestData.auth.customer))
        .send();

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Not Authorizated to show Loans'
      );
    });
  });

  describe('Loans Create API', () => {
    beforeEach(() => {
      loansTestData.newLoanData = {
        tenure: 24,
        interest: 12,
        principal_amount: 10000,
        interest_type: 'FIXED',
        createdfor: 3,
      };
    });

    it('should fail to create loans when no auth header is set', async () => {
      const response = await request(app)
        .post(`/api/v1/loans`)
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const selectedRole of notPermitedToEditCreate) {
      it(`should fail to create loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .post(`/api/v1/loans`)
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send(loansTestData.newLoanData);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty(
          'error.message',
          'Not Authorizated to create Loans'
        );
      });
    }

    it(`should able to create when agent access`, async () => {
      const response = await request(app)
        .post(`/api/v1/loans`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('Loans Edit API', () => {
    beforeEach(async () => {
      loansTestData.newLoanData = {
        tenure: 24,
        interest: 12,
        principal_amount: 10000,
        interest_type: 'FIXED',
        createdfor: 3,
      };

      const response = await request(app)
        .post(`/api/v1/loans`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);
      loansTestData.newLoanData.id = response.body.data.id;
    });

    it('should fail to edit loans when no auth header is set', async () => {
      const response = await request(app)
        .put(`/api/v1/loans/${loansTestData.newLoanData.id}`)
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const selectedRole of notPermitedToEditCreate) {
      it(`should fail to edit loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .put(`/api/v1/loans/${loansTestData.newLoanData.id}`)
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send(loansTestData.newLoanData);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty(
          'error.message',
          'Not Authorizated to edit Loans'
        );
      });
    }

    it(`should able to edit when agent access`, async () => {
      const response = await request(app)
        .put(`/api/v1/loans/${loansTestData.newLoanData.id}`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });

    it(`should fail to edit an approved loan when agent access`, async () => {
      const response = await request(app)
        .put(`/api/v1/loans/${get(customerLoans, '0.1.0')}`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Not Authorizated to edit Loans'
      );
    });
  });

  describe('Loans Delete API', () => {
    beforeEach(async () => {
      loansTestData.newLoanData = {
        tenure: 24,
        interest: 12,
        principal_amount: 10000,
        interest_type: 'FIXED',
        createdfor: 3,
      };

      const response = await request(app)
        .post(`/api/v1/loans`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);
      loansTestData.newLoanData.id = response.body.data.id;
    });

    it('should fail to delete loans when no auth header is set', async () => {
      const response = await request(app)
        .delete(`/api/v1/loans/${loansTestData.newLoanData.id}`)
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const selectedRole of permitedToDelete) {
      it(`should able to delete loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .delete(`/api/v1/loans/${loansTestData.newLoanData.id}`)
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('data');
      });
    }

    it(`should fail to delete loans when customer access`, async () => {
      const response = await request(app)
        .delete(`/api/v1/loans/${loansTestData.newLoanData.id}`)
        .set('Authorization', tokenToHeader(loansTestData.auth.customer))
        .send();

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Not Authorizated to delete Loans'
      );
    });

    it(`should fail to delete an approved loan when agent access`, async () => {
      const response = await request(app)
        .delete(`/api/v1/loans/${get(customerLoans, '0.1.0')}`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error.message',
        'Not Authorizated to delete Loans'
      );
    });
  });

  describe('Loans Set-Status API', () => {
    beforeEach(async () => {
      loansTestData.newLoanData = {
        tenure: 24,
        interest: 12,
        principal_amount: 10000,
        interest_type: 'FIXED',
        createdfor: 3,
      };

      const response = await request(app)
        .post(`/api/v1/loans`)
        .set('Authorization', tokenToHeader(loansTestData.auth.agent))
        .send(loansTestData.newLoanData);
      loansTestData.newLoanData.id = response.body.data.id;
    });

    it('should fail to set-status loans when no auth header is set', async () => {
      const response = await request(app)
        .patch(`/api/v1/loans/${loansTestData.newLoanData.id}/set-status`)
        .send(loansTestData.newLoanData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error.message', 'Unauthorized');
    });

    for (const selectedRole of notPermitedToSetStatus) {
      it(`should fail to set-status loans when ${selectedRole} access`, async () => {
        const response = await request(app)
          .patch(`/api/v1/loans/${loansTestData.newLoanData.id}/set-status`)
          .set('Authorization', tokenToHeader(loansTestData.auth[selectedRole]))
          .send(loansTestData.newLoanData);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('success', false);
        expect(response.body).toHaveProperty(
          'error.message',
          'Not Authorizated to set-status Loans'
        );
      });
    }

    it(`should able to set-status when admin access`, async () => {
      const response = await request(app)
        .patch(`/api/v1/loans/${loansTestData.newLoanData.id}/set-status`)
        .set('Authorization', tokenToHeader(loansTestData.auth.admin))
        .send({ status: 'APPROVED' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
    });
  });
});
