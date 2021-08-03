import pool from '../utils/pool.js';

export default class Quotes {
      id;
      quote;

      constructor(row) {
            this.id = row.id;
            this.quote = row.quote;
      }

      static async insert(value) {
            const { rows } = await pool.query(
                  'INSERT INTO quotes (quote) VALUES ($1) RETURNING *',
                  [value.quote]
            )

            return new Quotes(rows[0]);
      }
}