const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passwordHash = require('../Middleware/passwordHash');
const authenticate = require('../Middleware/authenticate');
const user = require('../Model/userSchema');


router.post('/register', passwordHash, async function(req, res) {
    try {
        const {email, password} = req.body; 
        const checkUser = await user.findOne({email});
        if(checkUser) {
            return res.json({success: false, message: 'Email is already registered'})
        }
        const newUser = new user({email, password});
        await newUser.save();
        res.json({success: true, message: 'Registration Complete'})
    } catch (err) {
        console.log('Server error');
    }
})

router.post('/login', authenticate, async (req, res) => {
    try {
       const token = jwt.sign({id: req.body.id}, process.env.SECRET, {expiresIn: '1d'});
       res.json({success: true, message: 'You are logged in', token});
    } catch (error) {
        console.log('Server error')
    }
})

module.exports = router;