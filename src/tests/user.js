const request = require('supertest');
const app = require('../app');


const URL_BASE = '/users'
let TOKEN
let userID

const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'test1234',
    phone: 'test'
}

beforeAll(async() => {
    const user = {
        email: 'admin',
        password: 'admin1234'
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    TOKEN = res.body.token
})

test("'GET -> 'URL_BASE', should return status code 200 (ok), r ", async() => { 
    const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
 })

test("'POST -> 'URL_BASE', should return status code 201, r ", async() => { 
    const res = await request(app)
    .post(URL_BASE)
    .send(user)

    userID = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toEqual(user.firstName)
 })

test ("'PUT -> 'URL_BASE', should return status code 201, r ", async() => {
    const res = await request(app)
    .put(`${URL_BASE}/${userID}`)
    .send({ firstName: 'test2' })
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toEqual('test2')
}) 



test("POST-> 'URL_BASE/login', should return status code 200, r ", async() => {
    const userLogin = {
        email: 'test@test.com',
    password: 'test1234'
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(userLogin)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})
    
test("DELETE -> 'URL_BASE/:id', should return status code 204, r ", async() => {
    const res = await request(app)
    .delete(`${URL_BASE}/${userID}`)
    .set('Authorization', `Bearer ${TOKEN}`)
})