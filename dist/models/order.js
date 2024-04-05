"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
//represetation of the db
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release(); //release the connection
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error('Could not fint order ${id}. Error: ${err}');
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            // Check if user exists to prevent foreign key violation
            const userSql = 'SELECT * FROM users WHERE id=($1)';
            const userResult = await conn.query(userSql, [o.user_id]);
            if (userResult.rows.length === 0) {
                throw new Error(`User with id ${o.user_id} does not exist`);
            }
            const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.status, o.user_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not create order. Error: ${err}`);
        }
    }
    async currentOrderByUser(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const result = await conn.query(sql, [userId, 'active']);
            conn.release();
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            else {
                return null;
            }
        }
        catch (err) {
            throw new Error(`unable get current order for user ${userId}: ${err}`);
        }
    }
    //add product to the order
    async addProductToOrder(quantity, orderId, productId) {
        try {
            const sql = 'INSERT INTO orders_products (quantity, orders_id, products_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [quantity, orderId, productId]);
            //console.log('result in addProductToOrder', result);
            const orderProduct = result.rows[0];
            //console.log('orderProduct in Order', orderProduct);
            conn.release();
            return orderProduct;
        }
        catch (err) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
