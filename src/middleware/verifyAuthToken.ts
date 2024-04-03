import express from 'express';
//import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const tokenSecret = process.env.TOKEN_SECRET;
      if (!tokenSecret) {
        throw new Error('TOKEN_SECRET is not set in the environment');
      }
      const decoded = jwt.verify(token, tokenSecret);
      //console.log('decoded', decoded);
      next();
    }
  } catch (error) {
    //console.log('error', error);
    res.status(401);
  }
};
export default verifyAuthToken;
