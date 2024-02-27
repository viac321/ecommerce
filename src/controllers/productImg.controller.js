const catchError = require("../utils/catchError")
const ProductImg = require("../models/ProductImg")

const getAll = catchError(async(req,res)=>{
    const result = await ProductImg.findAll();
    return res.json(result);
});

const create = catchError(async(req,res)=>{
    const {filename} = req.file
    const url = `${req.protocol}://${req.headers.host}/uploads/${filename}`
    const newBody = {filename, url} 
    const result = await ProductImg.create(newBody)
    return res.status(201).json(result)
})

const remove = catchError(async(req,res)=>{
    const {id} = req.params
    const result = await ProductImg.findByPk(id)
    if(!result) return res.sendStatus(404)
    const imageFilePath = path.join(__dirname,"..", "public","uploads",`${result.filename}`);
    fs.unlinkSync(imageFilePath)
    await result.destroy()
    return res.sendStatus(204)
})



module.exports = {
    getAll,
    create,
    remove
}