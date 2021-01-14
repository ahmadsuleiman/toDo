const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const encrypt = require('../hash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username)  return res.status(400).send('enter username');
    if (!password) return res.status(400).send('enter password');

    const encpassword = await encrypt(password);

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (user) return res.status(400).send("username already exist");

    const newUser = await User.create({
        username: username,
        password: encpassword
    })
        .then(result => result)
        .catch(err => err);
    res.send(newUser)
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;


    if (!username) return res.status(400).send({error:"missing username"});
    if (!password) return res.status(400).send('enter password');

    const user = await User.findOne({
        where: {
            username: username,
        }
    })
        .then(result => result)
        .catch(err => console.log(err));
    if (!user) return res.status(404).send('invalid user name or password')

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(404).send("Invalid user name or password");

    res.send('valid username and password');
});

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users);
});

module.exports = router;