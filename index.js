const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');

//delcare port
var port = 3000;

//Set up express
const app = express();

//Use body Parser
app.use(bodyParser.json());

//Use routes from api.js
app.use(routes);

//Listen to requests
app.listen(process.env.port||port, function(){
    console.log("Listening on port "+ port)
});