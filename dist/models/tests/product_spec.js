"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
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
