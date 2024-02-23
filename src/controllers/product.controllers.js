const catchError = require('../utils/catchError');
const product = require('../models/Product');
const Category = require('../models/Category');
const { where } = require('sequelize');

const getAll = catchError(async(req, res) => {

    const { category } = req.query
    if(category) where.categoryId = category
    const results = await product.findAll(
        {include: [Category],
            //where: { categoryId: category }
            where
        });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await product.findByPk(id, {include: Category});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await product.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}