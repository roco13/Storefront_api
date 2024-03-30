CREATE TABLE orders ( 
    id SERIAL PRIMARY KEY, 
    status VARCHAR(10) NOT NULL, 
    user_id INTEGER NOT NULL REFERENCES users(id)
);