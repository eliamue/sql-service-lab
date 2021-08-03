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
      email: 'abe.froman@email.com',
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

  it('tests creating a Ron Swanson quote', async () => {
    const res = await request(app)
      .post('/api/v1/quotes')
      .send(0);

    expect(res.body).toEqual({ 0: expect.any(String) });
  });

  // it('creates a new brewery', async () => {
  //   const brewery = {
  //     bid: 8946,
  //     name: 'Bitter Brothers Brewing Co.',
  //     type: 'micro',
  //     city: 'San Diego',
  //     state: 'California',
  //     website: 'http://www.bitterbrothers.com'
  //   };

  //   const res = await request(app)
  //     .post('/api/v1/breweries')
  //     .send({ bid: 8946 });

  //   expect(res.body).toEqual({ ...brewery, id: '1' });
  // });
});
