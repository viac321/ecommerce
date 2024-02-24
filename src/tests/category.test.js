const request = require ('supertest')
const app = require ('../app')
const URL_BASE = '/categories'
URL_BASE_USERS = '/users'

let TOKEN
let categoryID

category = {
    name: 'electronics'
}

beforeAll(async() => {
    const user = {
        email: 'admin@gmail.com',
        password: 'admin1234'
    }

    const res = await request(app)
     .post(`${URL_BASE_USERS}/login`)
     .send(user)

    TOKEN = res.body.token
})

test('GET -> URL_BASE , should return status code 200, res.body should be defined and res.body length === 1', async() => {
    const res = await request(app)
    .get(URL_BASE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    //expect(res.body.length).toBe(1)
})

test('post -> URL_BASE, should return status code 201, res.body should be define and  res.body.name === category.name ', async() => {
    
    const res = await request(app)
    .post(URL_BASE)
    .send(category)
    .set("Authorization", `Bearer ${TOKEN}`) //we use method set to add the token
     categoryID = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)

})

test('DELETE -> URL_BASE , should return status code 204, ', async() => {
    const res = await request(app)
    .delete(`${URL_BASE}/${categoryID}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})