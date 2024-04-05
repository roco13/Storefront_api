"use strict";
/* import { Product, ProductStore } from '../product';
import app from '../../server';
import supertest from 'supertest';
import client from '../../database';

const store = new ProductStore();
const request = supertest(app);
const testProduct: Product = {
  id: 2,
  name: 'The Hobbit',
  price: 10,
  category: 'fiction'
};

let token: string;

describe('Test Product Model Methods', () => {
  beforeAll(async () => {
    //add a product to the db
    const product: Product = {
      id: 1,
      name: 'The lord of the rings',
      price: 14,
      category: 'fiction'
    };
    await store.create(product);
  });

  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
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
    expect(store.show).toBeDefined();
  });
  it('should have a delete method', () => {
    expect(store.show).toBeDefined();
  });
  it('should list all the products from the database', async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });
  it('should show a product from the database', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'The lord of the rings',
      price: 14,
      category: 'fiction'
    });
  });
  it('should delete a product', async () => {
    const newProduct: Product = await store.create(testProduct);
    const id = newProduct.id as number;
    const result = await store.delete(id);
    expect(result).toBeDefined();
    expect(result.name).toEqual('The Hobbit');
  });
});

describe('App test: products test via endpoints', () => {
  beforeAll(async () => {
    //create a test user to get a token
    const res = await request.post('/users').send({
      username: 'testUser1',
      password_digest: 'test123'
    });
    token = 'Bearer ' + res.body;
  });
  afterAll(async () => {
    const conn = await client.connect();
    const sql =
      'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
    await conn.query(sql);
    conn.release();
  });
  //index
  it('GET to /products should return status 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });
  //create
  it('POST to /products should return status 200', async () => {
    const response = await request
      .post('/products')
      .send(testProduct)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
  //show
  it('GET to /products/:id should return status 200', async () => {
    const response = await request
      .get(`/users/${testProduct.id}`)
      .set('Authorization', token);
    expect(response.status).toBe(200);
  });
});
 */
