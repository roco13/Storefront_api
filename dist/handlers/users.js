"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await store.show(userId);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const user = {
        username: req.body.username,
        password_digest: req.body.password
    };
    try {
        const newUser = await store.create(user);
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deletedUser = await store.delete(req.body.id);
        res.json(deletedUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password_digest: req.body.password
    };
    try {
        const u = await store.authenticate(user.username, user.password_digest);
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET iis not set in the environment');
        }
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        console.log('token', token);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const users_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.delete('/users/:id', verifyAuthToken_1.default, destroy);
    app.post('/users/authenticate', authenticate);
};
exports.default = users_routes;
