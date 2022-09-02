const bcrypt = require('bcryptjs');
const joi = require('joi');

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})

async function passwordHash(req, res, next){
    try{
        const {error} = schema.validate(req.body);
        if(error){    
            return res.json({success: false, message: error.details[0].message});
        } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        next();
    }catch(err){
        console.log('Server error');
    }
}

module.exports = passwordHash;