const express = require('express');
const path = require('path');
const app = express();

const dashboard = require('./server/routes/dashboard');

app.use(express.static(path.join( __dirname , 'dist' )));

app.use('/' , dashboard );

app.get('*' , (req,res)=>{
  res.sendFile(path.join(__dirname , 'dist/index.html'));
});

const port = process.env.PORT || 4000;

app.listen( port , (req,res) =>{
  console.log("Running on port "+ port );
});
