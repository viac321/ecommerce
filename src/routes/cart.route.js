const { getAll, create,  remove, update, getOne } = require('../controllers/cart.controller');
const express = require('express');

const routerCart = express.Router();

routerCart.route('/')
    .get(getAll)
    .post(create);

routerCart.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerCart;