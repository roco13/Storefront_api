import client from '../database';

//instance of the order class will create will create a new row in the db
export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

//represetation of the db
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release(); //release the connection
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error('Could not fint order ${id}. Error: ${err}');
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      // Check if user exists to prevent foreign key violation
      const userSql = 'SELECT * FROM users WHERE id=($1)';
      const userResult = await conn.query(userSql, [o.user_id]);
      console.log('userResult in create Order=', userResult);
      if (userResult.rows.length === 0) {
        throw new Error(`User with id ${o.user_id} does not exist`);
      }
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.status, o.user_id]);
      console.log('result in create Order=', result.rows[0]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  async currentOrderByUser(userId: number): Promise<Order | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
      const result = await conn.query(sql, [userId, 'active']);
      conn.release();

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(`unable get current order for user ${userId}: ${err}`);
    }
  }

  //add product to the order
  async addProductToOrder(
    quantity: number,
    orderId: string,
    productId: string,
    userId: number
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders_products (quantity, orders_id, products_id) VALUES($1, $2, $3) RETURNING *';

      const conn = await client.connect();
      const result = await conn.query(sql, [
        quantity,
        orderId,
        productId,
        userId
      ]);
      console.log('result in addProductToOrder', result);

      const orderProduct = result.rows[0];
      console.log('orderProduct in Order', orderProduct);
      conn.release();

      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
