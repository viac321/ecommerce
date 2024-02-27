const request = require('supertest');
const app = require('../app');


const URL_BASE = "/purchases"

let TOKEN
//let userID
const user = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    password: 'test1234',
    phone: 'test'
}

beforeAll(async() => {
    const user = {
        email: 'admin@gmail.com',
        password: 'admin1234'
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    TOKEN = res.body.token
})
console.log(TOKEN)

test('GET -> "URL_BASE "', async() => {
    const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    console.log(res.body)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})