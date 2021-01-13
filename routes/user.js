const express = require('express');
const router = express.Router();
const encrypt = require('../hash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/register', async (req, res) => {

    const { username, password } = req.body;

    if (!username) return res.status(400).send('enter username');
    if (!password) return res.status(400).send('enter password');

    const encpassword = await encrypt(password);

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (user) return res.status(400).send("username already exist");

    await User.create({
        username: username,
        password: encpassword
    })
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username) return res.status(400).send('enter username');
    if (!password) return res.status(400).send('enter password');

    let user = await User.findOne({
        where: {
            username: username,
        }
    })
        .then(result => result)
        .catch(err => console.log(err));
    if (!user) return res.status(400).send('invalid user name or password')

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(400).send("Invalid user name or password");

    res.send('valid username and password');
});

router.get('/', async (req, res) => {
    User.findAll()
        .then(result => res.send(result))
        .catch(err => console.log(err));
});

module.exports = router;