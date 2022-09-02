require('dotenv').config();
require('./DB/conn');

const cors = require('cors');
const express = require('express');
const app = express();
const userApi = require('./Routes/userApi');
const movieApi = require('./Routes/movieApi');
const PORT = process.env.PORT || 5000;

app.use(cors({origin: process.env.REMOTE_CLIENT_APP, credentials: true}));
app.use(express.json());
app.use('/user', userApi);
app.use('/movie', movieApi);



app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT}`);
});