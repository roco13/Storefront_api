import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id);
    const order = await store.show(orderId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  const order = {
    user_id: req.body.user_id,
    status: req.body.status
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProductToOrder = async (
  req: express.Request,
  res: express.Response
) => {
  const quantity = parseInt(req.body.quantity);
  const orderId = req.body.orders_id;
  const productId = req.body.products_id;
  const userId = req.body.user_id;
  try {
    const newOrder = await store.addProductToOrder(
      quantity,
      orderId,
      productId,
      userId
    );
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const order = await store.currentOrderByUser(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const orders_routes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/addproduct', verifyAuthToken, addProductToOrder);
  app.get('/orders/:userid', verifyAuthToken, currentOrderByUser);
};
export default orders_routes;
