const express = require('express');
const router = express.Router();


//Get list of users
router.get('/users', function(req,res){
    res.send({name: "GET"});
})

//Add new user
router.post('/users', function(req,res){
    console.log(req.body);
    
})

//Update a user
router.put('/users/:id', function(req,res){
    res.send({name: "PUT"});
})

//Delete a user
router.delete('/users/:id', function(req,res){
    res.send({name: "DELETE"});
})

module.exports = router;
