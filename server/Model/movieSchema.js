const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    videoId: {
        type: String, 
        required: true
    }
})

const model = mongoose.model('movie__list', movieSchema);
module.exports = model;