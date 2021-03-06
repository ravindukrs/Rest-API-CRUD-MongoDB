const express = require('express');
const router = express.Router();
const User = require('../models/user');

//Get list of users
router.get('/users', function (req, res, next) {
    if(req.query.id != undefined){
        console.log("ID Defined, Search by ID");
        User.find({id:req.query.id}).then(function (users) {
            res.send(users);
        }).catch(next);
    }else if (req.query.name != undefined){
        console.log("Name Defined, Search by Name");
        User.find({name:req.query.name}).then(function (users) {
            res.send(users);
        }).catch(next);
    }else if (req.query.lat == undefined || req.query.lng == undefined || req.query.lat == "" || req.query.lng == "") {
        console.log("Lat and Long Not Defined, Sending all Users");
        User.find({}).then(function (users) {
            res.send(users);
        }).catch(next);
    } else if ((req.query.lat != undefined) && (req.query.lng != undefined) && (req.query.lat != "") && (req.query.lng != "")) {
        console.log("Lat and Long Defined");
        User.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
                    distanceField: "dist.calculated",
                    maxDistance: 100000,
                    includeLocs: "dist.location",
                    spherical: true
                }
            }
        ]).then(function (users) {
            res.send(users);
        }).catch(next);
    }
})


//Add new user
router.post('/users', function (req, res, next) {
    var tempUser = new User(req.body);
    tempUser.save().then(function (data) {
        res.send(data);
    }).catch(next); //Save to DB
})

//Update a user
router.put('/users/:id', function (req, res, next) {
    User.findOneAndUpdate({ id: req.params.id }, req.body, { useFindAndModify: false }).then(function () {
        User.findOne({ id: req.params.id }).then(function (user) {
            res.send(user);
        }).catch(next);
    }).catch(next);
})

//Delete a user
router.delete('/users/:id', function (req, res, next) {
    User.findOneAndDelete({ id: req.params.id }, { useFindAndModify: false }).then(function (user) {
        res.send(user);
    }).catch(next);
})

module.exports = router;
