const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const routerUser = express.Router();
const verifyJwt = require('../utils/verifyJWT');

const express = require('express');

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create)

routerUser.route('/login')    
    .post(login)

routerUser.route('/:id')
    .delete(verifyJwt, remove)
    .put(verifyJwt, update)

module.exports = routerUser;