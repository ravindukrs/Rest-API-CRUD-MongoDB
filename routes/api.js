const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Get list of users
router.get('/users', function(req,res, next){
    res.send({name: "GET"});
})

//Add new user
router.post('/users', function(req,res, next){
    var tempUser = new User(req.body);
    tempUser.save().then(function(data){
        res.send(data);
    }).catch(next); //Save to DB
})

//Update a user
router.put('/users/:id', function(req,res, next){
    res.send({name: "PUT"});
})

//Delete a user
router.delete('/users/:id', function(req,res, next){
    res.send({name: "DELETE"});
})

module.exports = router;
