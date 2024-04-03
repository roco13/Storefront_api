"use strict";
/* import { User, UserStore } from '../user';
import supertest from 'supertest';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const app = express();
const request = supertest(app);
let orderToken: string;
const store = new UserStore();

const pepper = process.env.BCRYPT_PASSWORD;

describe('User Model', () => {
  let testUser = {
    id: 1,
    username: 'usertest',
    password_digest: '1234'
  };
//   'users' [GET]
// 'users/:id' [GET]
// 'users' [POST]
// 'users/:id' [DELETE]
// 'users/authenticate' [POST]
  it('should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
  // it('should have a create method', () => {
  //   expect(store.create).toBeDefined();
  // });
  // it('should have an index method', () => {
  //   expect(store.index).toBeDefined();
  // });
  // it('should have a show method', () => {
  //   expect(store.show).toBeDefined();
  // });

  // it('should create a new user', async () => {
  //   const testUser: User = {
  //     id: 2,
  //     username: 'usertest2',
  //     password_digest: '123'
  //   };
  //   const result = await store.create(testUser);
  //   expect(result).toBeDefined();
  //   expect(result.username).toEqual(testUser.username);
  //   const match = await bcrypt.compare(
  //     testUser.password_digest + pepper,
  //     result.password_digest
  //   );
  //   expect(match).toBe(true);
  // });
});
//const request = require('request');

//const base_url = 'http://localhost:3001/users';
describe('Users List API Exists', function () {
  describe('GET /users', function () {
    // it('returns status code 200', function (done) {
    //   request.get(base_url, function (error, response, body) {
    //     expect(response.statusCode).toBe(200);
    //     done();
    //   });
    // });

    // it('should respond with status 200', async () => {
    //   const response = await request.get('/users');
    //   expect(response.statusCode).toBe(200);
    // });

    beforeAll(async () => {
      const newUser = await request
        .post('/users')
        .send({
          username: 'ordertest',
          password_digest: 'ordertest1',
          first_name: 'test',
          last_name: 'test'
        })
        .set('Accept', 'application/json');
      orderToken = newUser.body;
    });

    it('should respond with status 200', async () => {
      const response = await request.get('/users');
      expect(response.statusCode).toBe(200);
    });
  });
});
 */
