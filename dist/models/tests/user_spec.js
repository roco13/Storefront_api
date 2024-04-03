"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const store = new user_1.UserStore();
const pepper = process.env.BCRYPT_PASSWORD;
const request = (0, supertest_1.default)(server_1.default);
let token;
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
