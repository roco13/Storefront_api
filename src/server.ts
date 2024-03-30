import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import product_routes from './handlers/products';
import order_routes from './handlers/orders';
import users_routes from './handlers/users';

const app: express.Application = express();
const address: string = '0.0.0.0:3001';

app.use(bodyParser.json());

//test route
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World from Store!');
});

product_routes(app);
order_routes(app);
users_routes(app);
// app.get('/article', function (req: Request, res: Response) {
//   res.send('this is the index route');
// });
// app.get('/article/:id', function (req: Request, res: Response) {
//   res.send('this is the show route');
// });
app.listen(3001, function () {
  console.log(`starting app on: ${address}`);
});
