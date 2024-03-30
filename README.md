# Storefront Backend Project

This repo contains a node API with Postgres and Express. You need to have Docker installed to connect to Postgress, and Postman to test the endpoints.

## Instalation

Clone this repo and run `npm i` to install dependencies.

## Set up

- Create a .env file in the root directory with the following info:

  ```
  POSTGRES_HOST=127.0.0.1
  POSTGRES_DB=db_dev
  POSTGRES_USER=db_user3
  POSTGRES_PASSWORD=admin123
  POSTGRES_TEST_DB=db_test
  ENV=dev
  BCRYPT_PASSWORD=speak-and-enter
  SALT_ROUNDS=10
  TOKEN_SECRET=alohomora123!
  ```

- run `docker compose up` (The database will connect with port: 5001)
- run `docker ps` to grab the docker container id or name
- run `docker exec -it <container id> bash`
- run ` psql -h 127.0.0.1 -U db_user3 -d db_dev` to connect to postgres
- run db-migrate up to create the tables

## Data Shapes

#### Product

- id SERIAL PRIMARY KEY
- name VARCHAR
- price integer
- category text

#### User

- id SERIAL PRIMARY KEY
- username VARCHAR
- password_digest VARCHAR

#### Orders

- id SERIAL PRIMARY KEY
- status (active or complete) VARCHAR
- user_id integer[foreign key to users table]

#### Orders-Products

- id SERIAL PRIMARY KEY
- quantity integer
- orders_id integer[foreign key to orders table]
- products_id integer[foreign key to products table]

## API Endpoints

#### Products

```
'products' [GET]
'products/:id' [GET]
'products' [POST]
```

#### User

```
'users' [GET]
'users/:id' [GET]
'users' [POST]
'users/:id' [DELETE]
'users/authenticate' [POST]
```

#### Orders

```
'orders' [GET]
'orders/:id' [GET]
'orders' [POST]
'orders/addproduct' [POST]
```
