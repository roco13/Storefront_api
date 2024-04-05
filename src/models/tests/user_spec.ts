import { User, UserStore } from '../user';
import app from '../../server';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import client from '../../database';

const store = new UserStore();
const pepper = process.env.BCRYPT_PASSWORD;

const request = supertest(app);
let token: string;
const testUser = {
  id: 1,
  username: 'usertest',
  password_digest: '1234'
};

describe('Test User Model Methods', () => {
  beforeAll(async () => {
    //create a test user to get a token
    const res = await request.post('/users').send({
      username: 'testUser1',
      password_digest: 'test123'
    });
    token = 'Bearer ' + res.body;
    //console.log('token==', token);
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
    await conn.query(sql);
    conn.release();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('should list all the users from the database', async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });
  it('should show an user from the database', async () => {
    const result = await store.show(1);
    expect(result.username).toBeDefined();
  });
  it('should create a new user', async () => {
    const testUser: User = {
      id: 2,
      username: 'usertest2',
      password_digest: '123'
    };
    const result = await store.create(testUser);
    expect(result).toBeDefined();
    expect(result.username).toEqual(testUser.username);
    const match = await bcrypt.compare(
      testUser.password_digest + pepper,
      result.password_digest
    );
    expect(match).toBe(true);
  });
  it('should delete a user', async () => {
    const result = await store.delete(2);
    expect(result.id).toBe(2);
  });
  it('should authenticate a user', async () => {
    const testUser: User = {
      id: 3,
      username: 'usertest3',
      password_digest: '123'
    };
    const user = await store.create(testUser);
    const result = await store.authenticate(
      user.username,
      user.password_digest
    );
    expect(result).toBeDefined();
    if (result) {
      expect(result.username).toEqual(user.username);
    }
  });
  //end of model tests

  //start of endpoint tests
  //index
  it('GET to /users should return status 200', async () => {
    const response = await request.get('/users').set('Authorization', token);
    expect(response.status).toBe(200);
  });
  //create
  it('POST to /users should return status 200', async () => {
    const response = await request.post('/users').send(testUser);
    //console.log('response', response.body);
    expect(response.status).toBe(200);
  });
  //show
  it('GET to /users/:id should return status 200', async () => {
    const response = await request
      .get(`/users/${testUser.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
});
