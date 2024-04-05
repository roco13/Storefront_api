"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
//represetation of the db
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release(); //release the connection
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect(); // Specify the type of conn as Client
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`unable create product (${p.name}): ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            // Fetch the product before deleting it
            let sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            // Delete the product
            sql = 'DELETE FROM products WHERE id=($1)';
            await conn.query(sql, [id]);
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`unable delete product (${id}): ${err}`);
        }
    }
}
exports.ProductStore = ProductStore;
