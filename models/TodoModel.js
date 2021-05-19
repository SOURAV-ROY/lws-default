const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'TodoSchemas'});


TodoSchema.methods = {
    findActive: () => {
        return mongoose.model("TodoSchema").find({status: 'active'});
    }
}

module.exports = mongoose.model('TodoSchema', TodoSchema);
