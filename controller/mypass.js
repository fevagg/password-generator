const mypass = require("../lib/mypass");
const CryptoJS = require("crypto-js");
const { storePass, selectPassByUser, deletePass, selectSinglePass, updateSinglePass } = require("../model/mypass");

module.exports = {
    async creatingPassword(req, res) {
      const newPass = {
        name: req.body.name,
        description: req.body.description,
        password: mypass.createPass({
          length: req.body.length,
          min: req.body.min,
          max: req.body.max,
          symbols: req.body.symbols,
          numbers: req.body.numbers,
        }),
        id_user: req.user.id,
      };
      const encryptedPass = CryptoJS.AES.encrypt(newPass.password, process.env.PASS_DB).toString();
      newPass.password = encryptedPass;
      await storePass(newPass);
      res.redirect("/")
    },
    async showingPassword(req, res){
      const pass = await selectPassByUser(req.user.id);
      for(let i = 0; i < pass.length; i++){
          const onePassword = pass[i];
          const decryptedPass = CryptoJS.AES.decrypt(onePassword.password, process.env.PASS_DB);
          onePassword.password = decryptedPass.toString(CryptoJS.enc.Utf8);
      }
      res.render("../view/home", { 
          pass: pass
       });
    },
    async deletePassword(req, res){
      const { id } = req.params
      await deletePass(id, req.user.id);
      res.redirect("/");
    },
    async editPass(req, res){
      const { id } = req.params
      const id_user = req.user.id
      const pass = await selectSinglePass(id, id_user);
      const decryptedPass = CryptoJS.AES.decrypt(pass[0].password, process.env.PASS_DB);
      pass[0].password = decryptedPass.toString(CryptoJS.enc.Utf8);
      res.render("../view/partials/edit", { pass: pass[0]});
    },
    async updatePass(req, res){
      const { id } = req.params;
      const { name, description, password } = req.body;
      const encryptedPass = CryptoJS.AES.encrypt(password, process.env.PASS_DB).toString();
      const newPass = {
        name,
        description,
        password: encryptedPass
      }
      await updateSinglePass(newPass, id)
      res.redirect("/");
    }
  };