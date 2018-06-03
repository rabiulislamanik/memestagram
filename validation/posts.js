const validator = require('validator');
const _ = require('lodash');

module.exports = function validatePostInput (data){
  let errors = {};
  data.comment_text = _.isEmpty(data.comment_text) ? '' : data.comment_text ;
  if(validator.isEmpty(data.comment_text)){
    errors.comment_text = "Comment text is required.";
  }
  return {
    errors,
    isValid : _.isEmpty(errors)
  }
};
