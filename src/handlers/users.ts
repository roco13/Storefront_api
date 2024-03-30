import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await store.show(userId);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password_digest: req.body.password
  };
  try {
    const newUser = await store.create(user);
    if (!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET is not defined');
    }
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(req.body.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password_digest: req.body.password
  };
  try {
    const u = await store.authenticate(user.username, user.password_digest);
    if (!process.env.TOKEN_SECRET) {
      throw new Error('TOKEN_SECRET iis not set in the environment');
    }
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET);
    console.log('token', token);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const users_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/authenticate', authenticate);
};
export default users_routes;
