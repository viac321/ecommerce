const catchError = require('../utils/catchError');
const user = require('../models/User');

const getAll = catchError(async(req, res) => {
    const results = await user.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await user.create(req.body);
    return res.status(201).json(result);
});


const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await user.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;

    delete req.body.password
    delete req.body.email

    const result = await user.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async(req, res) => {
    const { email, password } = req.body
    
})

module.exports = {
    getAll,
    create,
    remove,
    update
}