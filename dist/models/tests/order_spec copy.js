"use strict";
/* import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../user';
import app from '../../server';
import supertest from 'supertest';
import client from '../../database';

const store = new OrderStore();
const userStore = new UserStore();
const request = supertest(app);
let testUser1: User;
let testOrder1: Order;

const testUser = {
  id: 2,
  username: 'usertest',
  password_digest: '1234'
};
const testUser2 = {
  id: 3,
  username: 'usertest2',
  password_digest: '3333'
};
const testOrder = {
  id: 1,
  status: 'active',
  user_id: testUser.id
};

let token: string;

const testProduct = {
  id: 1,
  name: 'The lord of the ring',
  price: 14,
  category: 'fiction'
};

describe('Test Order Model Methods', () => {
  beforeAll(async () => {
    try {
      testUser1 = await userStore.create({
        username: 'test',
        password_digest: 'test'
      });
      testOrder1 = await store.create({
        status: 'active',
        user_id: testUser1.id as number
      });
    } catch (err) {
      console.error(err);
    }
  });
  afterAll(async () => {
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
  it('should fetch the current order for a user', async () => {
    const id = testUser1.id as number;
    const order = await store.currentOrderByUser(id);
    expect(order).toBeDefined();
  });
});

describe('App test: Orders test via endpoints', () => {
  beforeAll(async () => {
    //create a test user to get token
    const res = await request.post('/users').send(testUser);
    token = 'Bearer ' + res.body;
    console.log('testUser', testUser);
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await conn.query(sql);
    conn.release();
  });
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
      .get(`/users/${testOrder.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
});
 */
