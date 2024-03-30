"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const store = new user_1.UserStore();
const pepper = process.env.BCRYPT_PASSWORD;
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
