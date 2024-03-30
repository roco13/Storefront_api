CREATE TABLE orders_products ( 
    id SERIAL PRIMARY KEY, 
    quantity INTEGER NOT NULL,
    orders_id INTEGER NOT NULL REFERENCES orders(id),
    products_id INTEGER NOT NULL REFERENCES products(id)
);