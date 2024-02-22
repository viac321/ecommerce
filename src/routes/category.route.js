const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');
const verifyJwt = require('../utils/verifyJWT');

const Category = express.Router();

Category.route('/')
    .get(getAll)
    .post(verifyJwt,create);

Category.route('/:id')
    .delete(verifyJwt, remove)
   

module.exports = Category;