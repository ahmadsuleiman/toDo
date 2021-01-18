let server;
const request = require('supertest');
const { validate, createUser } = require('../repos/userRepo');
const User = require('../repos/userRepo');

describe('Register ', ()=> {
    beforeEach(()=> server = require('../index'));
    afterEach(()=> server.close())
    it('should return 400 status code due to missing username from await request body',  async ()=> {
        const data = {
            username: '',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter username');
    });

    it('should return 400 status code due to missing password from await request body',  async ()=> {
        const data = {
            username: 'mahmoud',
            password:''
        }
         await request(server)
            .post('/api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter password');
    });

    it('should return 400 status code due to existing user',  async ()=> {
        const data1 = {
            username:'ahmad',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data1);
        const data = {
            username: 'ahmad',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('username already exist');
    });

    it('should return 200 status code for valid input',  async ()=> {
        const data = {
            username: 'ahmad',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
    })
});

describe('Login', ()=> {
    beforeEach(async ()=> server = require('../index'));
    afterEach(async ()=> server.close())
    
    it('should return 400 status code due to missing username from  request body',  async ()=> {
        const data = {
            username:'',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter username');


    });

    it('should return 400 status code due to missing password from  request body',  async ()=> {
        const data = {
            username:'ahmad',
            password:''
        }

         await request(server)
            .post('/api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter password')
    });

    it('should return 404 status code due to invalid username',  async ()=> {
       const data1={
            username:'ahmad',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data1)
            .set('Accept', 'application/json');

        const data={
            username:'ahmd',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(404)
            .expect('invalid user name or password')
    });
    it('should return 404 status code due to invalid password',  async ()=> {
        const data1={
            username:'ahmad',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data1)
            .set('Accept', 'application/json');

        const data={
            username:'ahmad',
            password:'12345688'
        }
         await request(server)
            .post('/api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(404)
            .expect('Invalid user name or password')
    });

    it('should return 200 status code due to valid username and password',  async ()=> {
        const data1={
            username:'ahmad',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(data1)
            .set('Accept', 'application/json');

        const data={
            username:'ahmqd',
            password:'12345678'
        }
         await request(server)
            .post('/api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
    });
});