const validator = require('validator');
const _ = require('lodash');

module.exports = function validateLoginInput (data){
  let errors = {};

  data.email = _.isEmpty(data.email) ? '' : data.email ;
  data.password = _.isEmpty(data.password) ? '' : data.password ;

  if(validator.isEmpty(data.email)){
    errors.email = "Email is required.";
  }

  if(validator.isEmpty(data.password)){
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid : _.isEmpty(errors)
  }
};
