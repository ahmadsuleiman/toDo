const express = require('express');
const router = express.Router();
//const config = require('config');
//const jwt = require('jsonwebtoken');
const encrypt = require('../repos/hash');
const bcrypt = require('bcrypt');
const userRepo = require('../repos/userRepo');

router.post('/register', async (req, res) => {
    
    const validator = userRepo.validate(req.body);
    if(validator.msg) return res.status(400).send(validator.msg);

    const user = await userRepo.findUserByName(validator.username);
    if(user) return res.status(400).send("username already exist");

    const encpassword = await encrypt(validator.password);

    const newUser = await userRepo.createUser(validator.username,encpassword);
    res.send(newUser);
});

router.post('/login', async (req, res) => {
    const validator = userRepo.validate(req.body);
    if(validator.msg) return res.status(400).send(validator.msg);

    const user = await userRepo.findUserByName(validator.username);
    if (!user) return res.status(404).send('invalid user name or password')
    
    const valid = await bcrypt.compare(validator.password, user.password);
    if (!valid) return res.status(404).send("Invalid user name or password");

    res.send('valid username and password');
});

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

module.exports = router;