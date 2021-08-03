import pool from '../utils/pool.js';

export default class Breweries {
      id;
      bid;
      name;
      type;
      city;
      state;
      website;

      constructor(row) {
            this.id = row.id;
            this.bid = row.bid;
            this.name = row.name;
            this.type = row.type;
            this.city = row.city;
            this.state = row.state;
            this.website = row.website;
      }

      static async insert(value) {
            const { rows } = await pool.query(
                  'INSERT INTO breweries (bid, name, type, city, state, website) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                  [value.bid, value.name, value.type, value.city, value.state, value.website]
            )
            return new Breweries(rows[0]);
      }
}