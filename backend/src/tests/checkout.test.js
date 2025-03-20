// backend/src/tests/checkout.test.js
const request = require('supertest');
const app = require('../index'); // Adjust the path to your main app file
const db = require('../config/db'); // Import your db configuration

describe('Checkout Process', () => {
    let token;

    beforeAll(async () => {
        // Simulate user login to get a token
        const response = await request(app)
            .post('/api/auth/login') // Adjust the endpoint as necessary
            .send({
                email: 'testuser@example.com', // Use a valid test user
                password: 'password123', // Use the correct password
            });
        token = response.body.token; // Assuming the token is returned in the response
    });

    it('should successfully checkout and clear the cart', async () => {
        // Add a product to the cart first
        await request(app)
            .post('/api/cart/add') // Adjust the endpoint as necessary
            .set('Authorization', `Bearer ${token}`)
            .send({
                productId: '67db049b23d123263c0b8d53', // Use a valid product ID
                quantity: 1,
            });

        // Now perform the checkout
        const response = await request(app)
            .post('/api/checkout') // Adjust the endpoint as necessary
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Thank you for your purchase!');

        // Optionally, check if the cart is empty
        const cartResponse = await request(app)
            .get('/api/cart') // Adjust the endpoint as necessary
            .set('Authorization', `Bearer ${token}`);

        expect(cartResponse.body.items).toHaveLength(0); // Cart should be empty
    });
});