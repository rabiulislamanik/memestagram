const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  res.json({data : "GG"});
});
router.get('/demo',(req,res)=>{
  res.json({demodata : "1234"});
});

module.exports =router;
