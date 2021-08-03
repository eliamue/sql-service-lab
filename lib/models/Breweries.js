import pool from '../utils/pool.js';

export default class Breweries {
      id;
      bid;
      name;
      city;
      state;
      website;

      constructor(row) {
            this.id = row.id;
            this.bid = row.bid;
            this.name = row.name;
            this.city = row.city;
            this.state = row.state;
            this.website = row.website;
      }

      static async insert(value) {
            const { rows } = await pool.query(
                  'INSERT INTO breweries (bid, name, city, state, website) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  [value.bid, value.name, value.city, value.state, value.website]
            )
            return new Breweries(rows[0]);
      }

      static async getById(id) {
            const { rows } = await pool.query(
                  'SELECT * FROM breweries WHERE id=$1',
                  [id]
            );
            return new Breweries(rows[0]);
      }

      static async getAll() {
            const { rows } = await pool.query(
                  'SELECT * FROM breweries'
            )
            return rows.map(row => new Breweries(row));
      }

      static async update(id, { bid, name, city, state, website }) {
            const existingBrewery = await Breweries.getById(id);

            const newBid = bid ?? existingBrewery.bid;
            const newName = name ?? existingBrewery.name;
            const newCity = city ?? existingBrewery.city;
            const newState = state ?? existingBrewery.state;
            const newWebsite = website ?? existingBrewery.website;

            const { rows } = await pool.query(
                  'UPDATE breweries SET bid=$1, name=$2, city=$3, state=$4, website=$5 WHERE id=$6 RETURNING *',
                  [newBid, newName, newCity, newState, newWebsite, id]
            );
            return new Breweries(rows[0]);
      }
}