const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
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
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'TodoSchema'
        }
    ]
}, {collection: 'Users'});

module.exports = mongoose.model('User', UserSchema);
