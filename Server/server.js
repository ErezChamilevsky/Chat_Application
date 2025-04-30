const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const customEnv = require('custom-env');
const mongoose = require('mongoose');
const users = require('./routes/user');
const videos = require('./routes/video');
const tokens = require('./routes/tokens')
require('dotenv').config();

var server = express();



server.use(cors());
server.use(bodyParser.json({ limit: '50mb' })); // Increase the limit for JSON and URL-encoded bodies
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(express.static('public'));

// //connect to MongoDB
// mongoose.connect(process.env.CONNECTION_STRING,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

customEnv.env(process.env.NODE_ENV, './config');
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);


server.use(express.json());
server.use('/api/gemini/', require('./routes/gemini'));
//this routes is for users crud operations
// server.use('/api/users/', users);
//this routes is for videos crud operations
// server.use('/api/videos', videos);
//this routes is for login
// server.use('/api/tokens/', tokens)



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});