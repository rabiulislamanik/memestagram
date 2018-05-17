const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const db = require('./config/db.js');
const test = require('./routes/api/test.js');
const users = require('./routes/api/users.js');

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
app.use('/test',test);
app.use('/users',users);

//passport middleware
app.use(passport.initialize());
require('./config/passport.js')(passport);
//
port = process.env.PORT || 3000 ;
app.listen(port ,()=>{
  console.log(`Server is running on port : ${port}`);
});
