require("dotenv").config({ path: "../port.env" });

const mypass = {
  createPass: (config) => {
    let CHAR_POSSIBLE = [];

    if (config.min)
      Array.from("abcdefghijklmnopqrstuvwxyz").forEach((elem) =>
        CHAR_POSSIBLE.push(elem)
      );
    if (config.max)
      Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").forEach((elem) =>
        CHAR_POSSIBLE.push(elem)
      );
    if (config.symbols)
      Array.from("!#$%&()*+,-./:;<=>?[]^_{|}~@").forEach((elem) =>
        CHAR_POSSIBLE.push(elem)
      );
    if (config.numbers)
      Array.from("0123456789").forEach((elem) => CHAR_POSSIBLE.push(elem));
    let newPass = "";
    for (let i = 0; i < config.length; i++)
      newPass +=
        CHAR_POSSIBLE[Math.floor(Math.random() * CHAR_POSSIBLE.length)];

    return newPass;
  }
};

module.exports = mypass;

