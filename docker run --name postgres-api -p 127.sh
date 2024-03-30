docker run --name postgres-api -p 127.0.0.1:5001:5432 -e POSTGRES_USER=db_user3 -e POSTGRES_PASSWORD=admin123 -d postgres:15.5
docker run --name postgres-api -p 127.0.0.1:5001:5432 -e POSTGRES_USER=db_user3 -e POSTGRES_PASSWORD=admin123 -d postgres:15:5


"test": "export ENV=test && db-migrate --env test up && jasmine-ts && db-migrate --env test reset",
"test": "export ENV=test && npx tsc && db-migrate --env test up && jasmine-ts && db-migrate --env test reset",
"test": "ENV=test && npx tsc && db-migrate --env test up && jasmine && db-migrate db:drop test",

const client = new Pool({
        host: POSTGRES_HOST,
        database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })