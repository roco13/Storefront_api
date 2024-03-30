import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV
} = process.env;

console.log('ENV=', ENV);
// console.log('host:', POSTGRES_HOST);
// console.log('user', POSTGRES_USER);
// console.log('password', POSTGRES_PASSWORD);
// console.log('password2', process.env.POSTGRES_PASSWORD);

const client = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: 5001
});

// const BoundPool = client;
// console.log('client', client);
// console.log('typeof client', typeof client);

export default client;
