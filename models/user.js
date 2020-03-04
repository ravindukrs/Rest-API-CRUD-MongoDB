const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a Schema & Model

const UserSchema = new Schema({
    id: {
        type: String,
        required: [true, 'ID field is required']
    },
    name: {
        type: String,
        required: [true, 'Name field is required']
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;


