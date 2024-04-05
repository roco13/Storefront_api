"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../../database"));
const store = new user_1.UserStore();
const pepper = process.env.BCRYPT_PASSWORD;
const request = (0, supertest_1.default)(server_1.default);
let token;
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
        const conn = await database_1.default.connect();
        const sql = 'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
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
        const testUser = {
            id: 2,
            username: 'usertest2',
            password_digest: '123'
        };
        const result = await store.create(testUser);
        expect(result).toBeDefined();
        expect(result.username).toEqual(testUser.username);
        const match = await bcrypt_1.default.compare(testUser.password_digest + pepper, result.password_digest);
        expect(match).toBe(true);
    });
    it('should delete a user', async () => {
        const result = await store.delete(2);
        expect(result.id).toBe(2);
    });
    it('should authenticate a user', async () => {
        const testUser = {
            id: 3,
            username: 'usertest3',
            password_digest: '123'
        };
        const user = await store.create(testUser);
        const result = await store.authenticate(user.username, user.password_digest);
        expect(result).toBeDefined();
        if (result) {
            expect(result.username).toEqual(user.username);
        }
    });
});
describe('App test: users test via endpoints', () => {
    beforeAll(async () => {
        //create a test user to get token
        const res = await request.post('/users').send({
            username: 'testUser1',
            password_digest: 'test123'
        });
        token = 'Bearer ' + res.body;
        //console.log('token==', token);
    });
    afterAll(async () => {
        const conn = await database_1.default.connect();
        const sql = 'DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
        await conn.query(sql);
        conn.release();
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
