"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = __importDefault(require("../middleware/verifyAuthToken"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await store.show(productId);
        console.log('id req', req.params);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };
    try {
        const newProduct = await store.create(product);
        console.log(newProduct);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const product_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', verifyAuthToken_1.default, show);
    app.post('/products', verifyAuthToken_1.default, create);
};
exports.default = product_routes;
