import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const show = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await store.show(productId);
    console.log('id req', req.params);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  try {
    const newProduct = await store.create(product);
    console.log(newProduct);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const product_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  // add product
  //app.post('/products/:id', addProduct);
};

export default product_routes;
