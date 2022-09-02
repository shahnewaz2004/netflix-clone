require('dotenv').config();
const mongoose = require('mongoose');
const STRING = process.env.CONNECTION_STRING;

mongoose.connect(STRING, function(){
    console.log('Database connected');
})