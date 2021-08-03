import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an account with name and email', async () => {
    const user = {
      email: 'abe.froman@email.test',
      firstName: 'Abe',
      lastName: 'Froman'
    };

    const res = await request(app)
      .post('/api/v1/accounts')
      .send(user);

    expect(res.body).toEqual({
      id: '1',
      ...user,
      emessage: expect.any(String),
    });
  });
});
