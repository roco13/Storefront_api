import client from '../database';

//instance of the product class will create a new row in the db
export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

//represetation of the db
export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release(); //release the connection
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect(); // Specify the type of conn as Client
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable create product (${p.name}): ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable delete product (${id}): ${err}`);
    }
  }

  // async addProductToOrder(
  //   quantity: number,
  //   orderId: string,
  //   productId: string
  // ): Promise<Product> {
  //   //get order to see if it is open
  //   try {
  //     const sql = 'SELECT * FROM orders WHERE id=($1)';
  //     //@ts-ignore
  //     const conn = await client.connect();
  //     const result = await conn.query(sql, [orderId]);
  //     const order = result.rows[0];
  //     if (order.status !== 'open') {
  //       throw new Error(
  //         `Could not add product ${productId} to order ${orderId} because order is not open`
  //       );
  //     }
  //     conn.release();
  //   } catch (err) {
  //     throw new Error(`Error: ${err}`);
  //   }
  //   //add product to order
  //   try {
  //     const sql =
  //       'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
  //     //@ts-ignore
  //     const conn = await client.connect();
  //     const result = await conn.query(sql, [quantity, orderId, productId]);
  //     const product = result.rows[0];
  //     conn.release();
  //     return product;
  //   } catch (err) {
  //     throw new Error(`Error: ${err}`);
  //   }
  // }
}
