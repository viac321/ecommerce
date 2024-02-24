const { getAll, create,  remove, update } = require('../controllers/cart.controller');
const express = require('express');
const verifyJwt = require('../utils/verifyJWT');

const routerCart = express.Router();

routerCart.route('/')
    .get(verifyJwt,getAll)
    .post(verifyJwt,create);

routerCart.route('/:id')
    .delete(verifyJwt,remove)
    .put(verifyJwt,update);

module.exports = routerCart;