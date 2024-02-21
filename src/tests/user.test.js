const request = require('supertest');
const app = require('../app');

const URL_BASE = '/users'

const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test',
    password: 'test',
    phone: 'test'
}

test("'POST -> 'URL_BASE', should return status code 201, r ", async() => { 
    const res = await request(app)
    .post(URL_BASE)
    .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toEqual(user.firstName)
 })