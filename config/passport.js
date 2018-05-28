const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../config/db.js');
const keys = require('../config/keys.js');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretkey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload);
      db.query(`SELECT * from users where user_id = ${db.escape(jwt_payload.user_id)}`,(err,rows,fields)=>{
        if(!err){
          const user = rows[0];
          if(rows[0]){
            return done(null, user);
          }
          else{
            return done(null,false);
          }
        }
        else{
          res.status(400).send(err);
        }
      });
    })
  );
};
