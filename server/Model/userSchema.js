const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
})

const model = mongoose.model('registered__users', userSchema);
module.exports = model;