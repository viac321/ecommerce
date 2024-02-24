require('../models')
const request = require ('supertest')
const app = require ('../app');
const Category = require('../models/Category');

const URL_BASE = '/products';
const URL_USERS = '/users';

let TOKEN
let category // se crea porque es una relacion muchos a muchos
let product
let productId


//

// beforeAll ejecuta funcion asincrona

beforeAll( async() => {

    // login
    const user = {
        email: 'admin',
        password: 'admin1234'
    }

    const res = await await request(app) 
    .post(`${URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token

    // create category register primary instance
    category = await Category.create({
        name: 'Food'
    })

    
     product = {
       title: 'tacos',
       description: 'mexican food',
       price: "100",
       categoryId: category.id
    }
})

test("POST -> 'URL_BASE' should return code 201, res.body should be defined and res.body.title === product.title", async() => {
    const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})


test("GET -> 'URL_BASE' should return code 200, res.body should be defined and res.body.length === 1", async() => {
    const res = await request(app)
    .get(URL_BASE)

    console.log(res.body)
    
    expect(res.status).toBe(200)
    expect (res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)
  
    
})

test("GET -> 'URL_BASE/:productId', should return status code 200, res.body to be defined, res.body.title === product.title, res.body.category.id to be defined, and res.body.category.id === category.id", async() => {
    const res = await request(app)
    .get(`${URL_BASE}?category=${category.id}`)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    expect(res.body[0].categoryId).toBeDefined()
    expect(res.body[0].categoryId).toBe(category.id)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)

})

test("GET -> 'URL_BASE/:productId' should return code 200 and res.body should be defined", async() => {
    const res =await request(app)
    .get(`${URL_BASE}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    expect(res.body.category.id).toBeDefined()
    expect(res.body.category.id).toBe(category.id)

})

test("PUT -> 'URL_BASE/:productId' should return code 200 and res.body should be defined", async() => {
    const res = await request(app)
    .put(`${URL_BASE}/${productId}`)
    .send({
        title: 'electronics'
    })
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe('electronics')
})

test(" DELETE -> 'URL_BASE/:productId' should return code 204 ", async() => {
    const res = await request(app)
    .delete(`${URL_BASE}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    await category.destroy()
})