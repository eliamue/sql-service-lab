import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import BreweryService from '../lib/services/BreweryService.js';

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

  it('creates a new brewery', async () => {
    const brewery = {
      bid: 8946,
      name: 'Bitter Brothers Brewing Co.',
      city: 'San Diego',
      state: 'California',
      website: 'http://www.bitterbrothers.com'
    };

    const res = await request(app)
      .post('/api/v1/breweries')
      .send({ bid: 8946 });

    expect(res.body).toEqual({ ...brewery, id: '1' });
  });

  it('gets a brewery by id', async () => {
    const brewery = {
      bid: 8532,
      name: 'Backman Brewing Company',
      city: 'Whitehouse Station',
      state: 'New Jersey',
      website: 'http://backmanbrewing.com'
    };
    
    await BreweryService.generateBrewery({ bid: 8532 });
    const res = await request(app)
      .get('/api/v1/breweries/1');

    expect(res.body).toEqual({ ...brewery, id: '1' });
  });

  it('gets all breweries', async () => {
    const brewery1 = await BreweryService.generateBrewery({ bid: 8163 });
    const brewery2 = await BreweryService.generateBrewery({ bid: 8273 });
    const brewery3 = await BreweryService.generateBrewery({ bid: 8513 });
    const brewery4 = await BreweryService.generateBrewery({ bid: 8921 });

    const res = await request(app)
      .get('/api/v1/breweries');

    expect(res.body).toEqual([brewery1, brewery2, brewery3, brewery4]);
  });

  it('updates a specific brewery', async () => {
    const brewery = await BreweryService.generateBrewery({
      bid: 8999,
      name: 'Black Raven Brewing Co',
      city: 'Redmond',
      state: 'Washington',
      website: 'http://www.blackravenbrewing.com'
    });

    const res = await request(app)
      .put(`/api/v1/breweries/${brewery.id}`)
      .send({
        name: 'Black Raven Brewing Company'
      });
    expect(res.body).toEqual({ ...brewery, name: 'Black Raven Brewing Company' });
  });

  it('deletes a specific brewery', async () => {
    const brewery = await BreweryService.generateBrewery({
      bid: 8428,
      name: 'Argyle Brewing Company',
      city: 'Greenwich',
      state: 'New York',
      website: 'http://www.argylebrewing.com'
    });
    const res = await request(app)
      .delete(`/api/v1/breweries/${brewery.id}`);

    expect(res.body).toEqual({
      message: `${brewery.name} has been deleted.`
    });
  });
});
