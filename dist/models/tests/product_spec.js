"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const store = new product_1.ProductStore();
const request = (0, supertest_1.default)(server_1.default);
const testProduct = {
    id: 1,
    name: 'The lord of the ring',
    price: 14,
    category: 'fiction'
};
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyNzgsInVzZXJuYW1lIjoidGVzdFVzZXIxMSIsInBhc3N3b3JkX2RpZ2VzdCI6IiQyYiQxMCRlNE9VL2Q4Y3ZiWHEybHgvUUFoRmdPeXBHS2IyeEJSYVMyeVVBVXQzNVpCVUt3NHNOWWp1QyJ9LCJpYXQiOjE3MTIxMDk2NTd9.FiKXmrsVJ0LAtx2TJsrPlmavosJelENWewtSHGTY4IA';
describe('Product Model', () => {
    beforeEach(async () => {
        const product = {
            id: 1,
            name: 'The lord of the ring',
            price: 14,
            category: 'fiction'
        };
        await store.create(product);
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
    it('show method should return the correct Product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'The lord of the ring',
            price: 14,
            category: 'fiction'
        });
    });
});
describe('App test: products test via endpoints', () => {
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
