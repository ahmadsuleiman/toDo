let server;
const request = require('supertest');
const { validate, createUser } = require('../repos/userRepo');
const User = require('../repos/userRepo');

describe('Register ', () => {
    beforeEach(() => server = require('../index'));
    afterEach(() => server.close())
    it('should return 400 status code due to missing username from request body',  () => {
        const data = {
            username: '',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter username');
    });

    it('should return 400 status code due to missing password from request body',  () => {
        const data = {
            username: 'mahmoud',
            password:''
        }
         request(server)
            .post('api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter password');
    });

    it('should return 400 status code due to existing user',  () => {
        const data1 = {
            username:'ahmad',
            password:'12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data1);
        const data = {
            username: 'ahmad',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('username already exist');
    });

    it('should return 200 status code for valid input',  () => {
        const data = {
            username: 'ahmad',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
    })
});

describe('Login', () => {
    beforeEach(() => server = require('../index'));
    afterEach(() => server.close())
    
    it('should return 400 status code due to missing username from request body',  () => {
        const data = {
            username:'',
            password:'12345678'
        }
         request(server)
            .post('api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter username');


    });

    it('should return 400 status code due to missing password from request body',  () => {
        const data = {
            username:'ahmad',
            password:''
        }

         request(server)
            .post('api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter password')
    });

    it('should return 404 status code due to invalid username',  () => {
       const data1={
            username:'ahmad',
            password:'12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data1)
            .set('Accept', 'application/json');

        const data={
            username:'ahmd',
            password:'12345678'
        }
         request(server)
            .post('api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(404)
            .expect('invalid user name or password')
    });
    it('should return 404 status code due to invalid password',  () => {
        const data1={
            username:'ahmad',
            password:'12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data1)
            .set('Accept', 'application/json');

        const data={
            username:'ahmad',
            password:'12345688'
        }
         request(server)
            .post('api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(404)
            .expect('invalid user name or password')
    });

    it('should return 200 status code due to valid username and password',  () => {
        const data1={
            username:'ahmad',
            password:'12345678'
        }
         request(server)
            .post('api/users/register')
            .send(data1)
            .set('Accept', 'application/json');

        const data={
            username:'ahmqd',
            password:'12345678'
        }
         request(server)
            .post('api/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
    });
});

describe('Validate',()=>{
    it('is missing username',()=>{
        const result = validate({username:'',password:'1234'});
        expect(result.msg).toMatch("enter username");
    });
    it('is missing password',()=>{
        const result = validate({username:'ahmad',password:''});
        expect(result.msg).toMatch("enter password");
    });
    it('passed the validation',()=>{
        const result = validate({username:'ahmad',password:'123456789'});
        expect(result.msg).toBe('');
    })
})

describe('Create User',()=>{
    User.createUser = function(username,password){
        const users = ['ahmad','ali','suleiman'];
        if(users.includes(username))
            return "invalid";
        if(password.length<8)
            return 'invalid';
        return true;
    }

    it('should return invalid due to short password',()=>{
        const result = User.createUser('Ahmad','123456');
        expect(result).toBe("invalid");
    });
    it('should return invalid for unique constraint violation',()=>{    
        const result = User.createUser('ahmad','123456');
        expect(result).toBe("invalid");
    });
    it('should return true for valid input',()=>{
        const result = User.createUser("Mahmoud",'12345678');
    });
})

describe('Find User By ID',()=>{
    User.findUserById = function(userId){
        const users = [{userId:1,username:'ahmad',password:'12345678'},
        {userId:2,username:'ali',password:'12345678'}]
        for(let i = 0;i<users.length;i++){
            if(users[i].userId === userId)
            return users[i];
        }
        return false;
    }
    it('return false due to not existing id',()=>{
        const result = User.findUserById(8);
        expect(result).toBe(false);
    });

    it('return true due to valid id',()=>{
        const result = User.findUserById(2);
        expect(result).toMatchObject({userId:2,username:'ali',password:'12345678'});
    });
})

describe('Find User By Name',()=>{
    User.findUserByName = function(username){
        const users = [{userId:1,username:'ahmad',password:'12345678'},
        {userId:2,username:'ali',password:'12345678'}]
        for(let i = 0;i<users.length;i++){
            if(users[i].username === username)
            return users[i];
        }
        return false;
    }
    it('return false for invalid usename',()=>{
        const result = User.findUserByName('yaser');
        expect(result).toBe(false);
    });
    it('retrun valid user',()=>{
        const result=User.findUserByName('ahmad');
        expect(result).toMatchObject({userId:1,username:'ahmad',password:'12345678'})
    });
})