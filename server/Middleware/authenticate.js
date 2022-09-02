require('dotenv').config();
const user = require('../Model/userSchema');
const bcrypt = require('bcryptjs');


async function authenticate(req, res, next){
    try {
      const {email, password} = req.body;
      const findUser = await user.findOne({email});
      if(!findUser){
        return res.json({success: false, message: 'Email or Password is invalid'});
      }
      const checkPass = await bcrypt.compare(password, findUser.password);
      if(!checkPass){
        return res.json({success: false, message: 'Email or Password is invalid'});
      }
      req.body.id = findUser._id;
      next();
   
    } catch (error) {
        console.log('Server error');
    }

}

module.exports = authenticate;