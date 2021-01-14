const fetch = require('node-fetch');

//const User = require('../')
describe('Register ', () => {

    it('should return 400 status code due to missing username from request body', async () => {
        const res = await fetch("http://localhost:3000/api/users/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: '',
                password: '12345678'
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 400 status code due to missing password from request body', async () => {
        const res = await fetch("http://localhost:3000/api/users/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'mahmoud',
                password: ''
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 400 status code due to existing user', async () => {
        const res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'ahmad',
                password: '12345678'
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 200 status code for valid input', async () => {
        const res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'Ali',
                password: '12345678'
            })
        });
        expect(res.status).toBe(200);
    })
});

describe('Login', () => {

    it('should return 400 status code due to missing username from request body', async () => {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: '',
                password: '12345678'
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 400 status code due to missing password from request body', async () => {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'mahmoud',
                password: ''
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 404 status code due to invalid username', async () => {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "ahma",
                password: "12345678"
            })
        });
        expect(res.status).toBe(404);
    });
    it('should return 404 status code due to invalid password', async () => {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "ahmad",
                password: "12345679"
            })
        });
        expect(res.status).toBe(404);
    });

    it('should return 200 status code due to valid username and password', async () => {
        const res = await fetch("http://localhost:3000/api/users/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "ahmad",
                password: "12345678"
            })
        });
        expect(res.status).toBe(200);
    });
})