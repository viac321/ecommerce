require('../models')
const request = require('supertest');
const app = require('../app');
const supertest = require('supertest');
const Product = require('../models/Product');


const URL_BASE = "/purchases"
const URL_USERS = "/users"


let TOKEN
let userId
let productBody
let bodyCart
let product

const user = {
    
    email: 'admin@gmail.com',
    password: 'admin1234'
   
}

beforeAll(async() => {
    const user = {
        email: 'admin@gmail.com',
        password: 'admin1234'
    }
    const res = await request(app)
    .post(`${URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id

    productBody={
        title: "platano",
        description: "lorem21",
        price: 120
    }
    product= await Product.create(productBody)

    bodyCart = {
        productId: product.id,
        quantity: 2
    }
    await supertest(app)
     .post('/cart')
     .send(bodyCart)
     .set('Authorization', `Bearer ${TOKEN}`)


})





test('POST -> "URL_BASE, shoould return status code 200, res.body to be defined and res.body.length === proudct.quantity"', async() => {
    const res = await supertest(app)
    .post(`${URL_BASE}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    
    

    expect(res.statusCode).toBe(201)
    expect(res.body[0]).toBeDefined()
    expect(res.body[0].quantity).toBe(bodyCart.quantity)

})

test("GET -> 'URL_BASE', should status 200, res.body to be defined and res.body.length === 1", async()=>{
   const res = await supertest(app)
   .get(URL_BASE)
   .set('Authorization', `Bearer ${TOKEN}`)

   

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)

   expect(res.body[0].productId).toBeDefined()
   expect(res.body[0].productId).toBe(product.id)

   expect(res.body[0].userId).toBeDefined()
   expect(res.body[0].userId).toBe(userId)

   await product.destroy()
    })