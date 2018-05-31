const validator = require('validator');
const _ = require('lodash');

module.exports = function validateRegisterInput (data){
  let errors = {};

  data.name = _.isEmpty(data.name) ? '' : data.name ;
  data.email = _.isEmpty(data.email) ? '' : data.email ;
  data.password = _.isEmpty(data.password) ? '' : data.password ;
  data.confirmedpassword = _.isEmpty(data.confirmedpassword) ? '' : data.confirmedpassword ;

  if(!validator.isLength(data.name, {min:2 , max:30})){
    errors.name = "Name must be between 2-30 characters.";
  }
  if(validator.isEmpty(data.name)){
    errors.name = "Name is required.";
  }


  if(!validator.isEmail(data.email)){
    errors.email = "Invalid Email.";
  }
  if(validator.isEmpty(data.email)){
    errors.email = "Email is required.";
  }


  if(!validator.isLength(data.password, {min:5 , max:30})){
    errors.password = "Password must be between 5-30 characters.";
  }
  if(validator.isEmpty(data.password)){
    errors.password = "Password is required.";
  }

  if(validator.isEmpty(data.confirmedpassword)){
    errors.confirmedpassword = "Re-type the password.";
  }
  if(!validator.equals(data.password,data.confirmedpassword)){
    errors.confirmedpassword = "Passwords must match.";
  }
  return {
    errors,
    isValid : _.isEmpty(errors)
  }
};
