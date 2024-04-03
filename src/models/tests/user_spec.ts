import { User, UserStore } from '../user';
import app from '../../server';
import supertest from 'supertest';
import bcrypt from 'bcrypt';

const store = new UserStore();
const pepper = process.env.BCRYPT_PASSWORD;

const request = supertest(app);
let token: string;
const testUser = {
  id: 1,
  username: 'usertest',
  password_digest: '1234'
};

describe('User Model', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
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
});

describe('App test: users test via endpoints', () => {
  beforeAll(async () => {
    //create a test user to get token
    const res = await request.post('/users').send({
      username: 'testUser11',
      password_digest: 'test123'
    });
    token = 'Bearer ' + res.body;
    console.log('token==', token);
  });

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
