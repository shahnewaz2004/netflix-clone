require('dotenv').config();
const router = require('express').Router();
const movie = require('../Model/movieSchema');
const jwt = require('jsonwebtoken');

router.post('/add', async function(req, res){
    try {
        const {token, poster, videoId} = req.body;
        const checkToken = jwt.verify(token, process.env.SECRET);
        if(checkToken){
           const newList = new movie({
            userId: checkToken.id,
            poster, 
            videoId
           });
          await newList.save();
          res.json({success: true, message: 'Added to list'})
        }else{
            res.json({success: false, message: 'Login again and try'})
        }
    } catch (error) {
        console.log('Server error')
    }
})

router.post('/fetch', async (req, res) => {
    try {
        const {token} = req.body;
        const checkToken = jwt.verify(token, process.env.SECRET);
        if(checkToken){
          const findMovies = await movie.find({userId: checkToken.id});
          res.json({success: true, message: 'Movie fetched', movies: findMovies});
        }else{
            res.json({success: false, message: 'Login again and try'})
        }

    } catch (error) {
        console.log('Server error')
    }
})

router.post('/check', async (req, res) => {
    try {
        const {token, videoId} = req.body;
        const checkToken = jwt.verify(token, process.env.SECRET);
        if(checkToken){
          const checkMovie = await movie.findOne({userId: checkToken.id, videoId});
          if(checkMovie){
            res.json({success: true, message: 'Movie already added to list'});
          }
        }else{
            res.json({success: false, message: 'Login again and try'})
        }
    } catch (error) {
        console.log('Server error')
    }
})

router.post('/delete', async (req, res) => {
    try {
        const {token, videoId} = req.body;
        const checkToken = jwt.verify(token, process.env.SECRET);
        if(checkToken){
          const deleteMovie = await movie.deleteOne({userId: checkToken.id, videoId});
          if(deleteMovie.deletedCount > 0){
            res.json({success: true, message: 'Movie removed from the list'});
          }
        }else{
            res.json({success: false, message: 'Login again and try'})
        }
    } catch (error) {
        console.log('Server error')
    }
})

module.exports = router;