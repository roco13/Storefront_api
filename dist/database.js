"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, ENV } = process.env;
console.log('ENV=', ENV);
// console.log('host:', POSTGRES_HOST);
// console.log('user', POSTGRES_USER);
// console.log('password', POSTGRES_PASSWORD);
// console.log('password2', process.env.POSTGRES_PASSWORD);
const client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: 5001
});
// const BoundPool = client;
// console.log('client', client);
// console.log('typeof client', typeof client);
exports.default = client;
