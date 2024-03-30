"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
const users_1 = __importDefault(require("./handlers/users"));
const app = (0, express_1.default)();
const address = '0.0.0.0:3001';
app.use(body_parser_1.default.json());
//test route
app.get('/', function (req, res) {
    res.send('Hello World from Store!');
});
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, users_1.default)(app);
// app.get('/article', function (req: Request, res: Response) {
//   res.send('this is the index route');
// });
// app.get('/article/:id', function (req: Request, res: Response) {
//   res.send('this is the show route');
// });
app.listen(3001, function () {
    console.log(`starting app on: ${address}`);
});
