const bcrypt = require("bcrypt");

const crypt = {};

crypt.encryptPass = async (password)=>{
    const hash = bcrypt.hash(password, 10);
    return hash;
}

crypt.decrypt = async (password, savedPass) =>{
    await bcrypt.compare(password, savedPass)
    .catch((err)=>{
        console.error(err);
    });
}

module.exports = crypt;