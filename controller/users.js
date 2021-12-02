const { createUser, selectUserByName } = require("../model/user.js");
const crypt = require("../lib/crypt");

module.exports = {
  async signup(req, username, password, next) {
    const newUser = {
      username,
      password,
      email: req.body.email,
    };
    newUser.password = await crypt.encryptPass(password);
    const result = await createUser(newUser);
    newUser.id = result.insertId;
    return next(null, newUser);
  },
  async login(req, username, password, next) {
    const rows = await selectUserByName(username);
    if (rows.length > 0) {
      const user = rows[0];
      const validPass = crypt.decrypt(password, user.password);
      if (validPass) next(null, user);
      else next(null, false);
    } else {
      return next(null, false);
    }
  }
};
