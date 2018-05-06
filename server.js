const express = require('express');
const app = express();

app.get('/',(req,res,err)=>{
  console.log("Root");
  res.send("Hello");
});

port = process.env.PORT || 3000 ;
app.listen(port ,()=>{
  console.log(`Server is running on port : ${port}`);
});
