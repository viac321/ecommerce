require("../models");
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const URL_USER = "/users/login";
const URL_BASE = "/cart";
let TOKEN;
let bodyCart;
let bodyProduct;
let product;
let userId;
let cartId;

beforeAll(async () => {
  const user = {
    email: "admin@gmail.com",
    password: "admin1234",
  };

  const res = await request(app).post(URL_USER).send(user);

  TOKEN = res.body.token
  userId = res.body.user.id

  bodyProduct = {
    title: "franela",
    description: "lorem21",
    price: 45,
  };
  product = await Product.create(bodyProduct);

  bodyCart = {
    quantity: 1,
    productId: product.id,
  };

  Cart.create({ quantity: 1 })
});

test("Post-> url_base,should return statuscode 201, res.body to be defined and res.body.quantity === bodyCart.quantity", async () => {
  const res = await request(app)
    .post(URL_BASE)
    .send(bodyCart)
    .set("Authorization", `Bearer ${TOKEN}`);

    cartId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(bodyCart.quantity)
    expect(res.body.userId).toBe(userId)
});

test("GET -> 'URL_BASE', should status 200, res.body to be defined and res.body.length === 1", async()=>{
   const res = await request(app)
   .get(URL_BASE)
   .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
 
   expect(res.body[0].userId).toBeDefined()
   expect(res.body[0].userId).toBe(userId)
 
   expect(res.body[0].productId).toBeDefined()
   expect(res.body[0].productId).toBe(product.id)
})

test("GET -> 'URL_BASE/:id', should status 200, res.body to be defined and res.body.quantity === bodyCart.quantity", async () => {
  const res = await request(app)
    .get(`${URL_BASE}/${cartId}`)
    .set("Authorization", `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.quantity).toBe(bodyCart.quantity);
  expect(res.body.userId).toBeDefined();
  expect(res.body.userId).toBe(userId);
  expect(res.body.productId).toBeDefined();
  expect(res.body.productId).toBe(product.id);

  await product.destroy();
});
