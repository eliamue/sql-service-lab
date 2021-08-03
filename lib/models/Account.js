import pool from '../utils/pool.js';

export default class Account {
      id;
      email;
      firstName;
      lastName;

      constructor(row) {
            this.id = row.id;
            this.email = row.email;
            this.firstName = row.first_name;
            this.lastName = row.last_name;
      }

      static async insert({ email, firstName, lastName }) {
            const { rows } = await pool.query(
                  'INSERT INTO accounts (email, first_name, last_name) VALUES ($1, $2, $3) RETURNING *',
                  [email, firstName, lastName]
            );

            return new Account(rows[0]);
      }
}