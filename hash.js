const bcrypt = require('bcrypt');

async function encrypt(password) {
    const salt = await bcrypt.genSalt(10)
        .then(result => result)
        .catch(err => console.log(err));
    const encryptedPass =  bcrypt.hash(password, salt)
        .then(result => result)
        .catch(err => console.log(err));
    return encryptedPass;
}

module.exports = encrypt;