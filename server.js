const express = require('express');
const path = require('path');
const app = express();

const dashboard = require('./server/routes/dashboard');

app.use(express.static(path.join( __dirname , 'dist' )));

app.use('/' , dashboard );

app.get('*' , (req,res)=>{
  res.sendFile(path.join(__dirname , 'dist/index.html'));
});

app.listen(4000 , (req,res) =>{
  console.log("Running on port 4000");
});
