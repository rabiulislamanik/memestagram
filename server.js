const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const db = require('./config/db.js');
const test = require('./routes/api/test.js');
const users = require('./routes/api/users.js');
const profiles = require('./routes/api/profiles.js');
const posts = require('./routes/api/posts.js');
//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
app.use('/test',test);
app.use('/users',users);
app.use('/profiles',profiles);
app.use('/posts',posts);

//passport middleware
app.use(passport.initialize());
require('./config/passport.js')(passport);
//
port = process.env.PORT || 3000 ;
app.listen(port ,()=>{
  console.log(`Server is running on port : ${port}`);
});
