const bcrypt = require('bcrypt');

async function encrypt(password) {
    const salt = await bcrypt.genSalt(10);
    const encryptedPass =  await bcrypt.hash(password, salt);
    return encryptedPass;
}

module.exports = encrypt;