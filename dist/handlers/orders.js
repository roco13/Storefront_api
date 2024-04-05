"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id);
        const order = await store.show(orderId);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProductToOrder = async (req, res) => {
    const quantity = parseInt(req.body.quantity);
    const orderId = req.body.orders_id;
    const productId = req.body.products_id;
    const userId = req.body.user_id;
    try {
        const newOrder = await store.addProductToOrder(quantity, orderId, productId, userId);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const currentOrderByUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const order = await store.currentOrderByUser(userId);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orders_routes = (app) => {
    app.get('/orders', verifyAuthToken_1.default, index);
    app.get('/orders/:id', verifyAuthToken_1.default, show);
    app.post('/orders', verifyAuthToken_1.default, create);
    app.post('/orders/addproduct', verifyAuthToken_1.default, addProductToOrder);
    app.get('/orders/:userid', verifyAuthToken_1.default, currentOrderByUser);
};
exports.default = orders_routes;
