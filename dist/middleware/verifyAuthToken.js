"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { User, UserStore } from '../models/user';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const tokenSecret = process.env.TOKEN_SECRET;
            if (!tokenSecret) {
                throw new Error('TOKEN_SECRET is not set in the environment');
            }
            const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
            //console.log('decoded', decoded);
            next();
        }
    }
    catch (error) {
        //console.log('error', error);
        res.status(401);
    }
};
exports.default = verifyAuthToken;
