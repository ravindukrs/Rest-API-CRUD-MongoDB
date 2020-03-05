const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up express
const app = express();

//Enable Static Content
app.use(express.static('public'));

//delcare server port
var port = 3000;

//Connect to Database
mongoose.connect('mongodb://localhost/testuser',{ useNewUrlParser: true, useUnifiedTopology: true});

//Set mongoose promise to Global promise since 
//mongoose promise is depricated
mongoose.Promise = global.Promise;
 
//Use body Parser
app.use(bodyParser.json());

//Use routes from api.js
app.use(routes);

//Error handling function
app.use(function(err, req, res, next){
    res.status(422).send({
        error: err.message
    });  
});
 

//Listen to requests
app.listen(process.env.port||port, function(){
    console.log("Listening on port "+ port)
});