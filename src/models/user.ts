import client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

//instance of the user class will create a new row in the db
export type User = {
  id?: number;
  username: string;
  password_digest: string;
};

//represetation of the db
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release(); //release the connection
      //console.log('result.rows', result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect(); // Specify the type of conn as client
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      //console.log('result.rows[0]', result.rows[0]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *';
      if (!saltRounds || !pepper) {
        throw new Error('Environment variables are not defined');
      }
      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await client.connect();

      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      //console.log('result[0]', result.rows[0]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
  //authenticate method for sign in
  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await client.connect();
    const sql = 'SELECT password_digest FROM users WHERE username=($1)';

    const result = await conn.query(sql, [username]);
    //check if user with that username exists in the db
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    conn.release();
    return null;
  }
}
