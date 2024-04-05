import { Order, OrderStore } from '../../models/order';
import { User } from '../user';
import app from '../../server';
import supertest from 'supertest';
import client from '../../database';

const store = new OrderStore();
const request = supertest(app);
let testUser: User;
let testOrder: Order;

let token: string;

describe('Test Order Model Methods', () => {
  beforeEach(async () => {
    testUser = {
      id: 2,
      username: 'usertest',
      password_digest: '1234'
    };
    //create a test user to get token
    const res = await request.post('/users').send(testUser);
    token = 'Bearer ' + res.body;

    //add product in database
    testOrder = {
      id: 1,
      status: 'active',
      user_id: testUser.id || 0
    };
  });
  afterEach(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
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
  it('should fetch the active order for a user', async () => {
    const id = testUser.id as number;
    const order = await store.currentOrderByUser(id);
    expect(order).toBeDefined();
  });
  //end of model tests

  //start of endpoint tests
  //index
  it('GET to /orders should return status 200', async () => {
    const response = await request.get('/orders').set('Authorization', token);
    expect(response.status).toBe(200);
  });
  //create
  it('POST to /orders should return status 200', async () => {
    const response = await request
      .post('/orders')
      .send(testOrder)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  //show
  it('GET to /orders/:id should return status 200', async () => {
    const response = await request
      .get(`/orders/${testOrder.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  //currentOrderByUser
  it('currentOrderByUser handler should return an order', async () => {
    const response = await request
      .get(`/orders/${testUser.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
});
