const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'Users'});

module.exports = mongoose.model('User', UserSchema);
