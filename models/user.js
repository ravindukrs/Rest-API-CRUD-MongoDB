const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create GeoLocation Schema
const GeoSchema = new Schema({
    type: {
        type: "String",
        default:  "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});


//Create a Schema & Model
const UserSchema = new Schema({
    id: {
        type: String,
        required: [true, 'ID field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    geometry: GeoSchema
});

const User = mongoose.model('user', UserSchema);

module.exports = User;


