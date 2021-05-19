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

// Instance Method **********************************************************
TodoSchema.methods = {
    findActive: () => {
        return mongoose.model("TodoSchema").find({status: 'active'});
    },

    findActiveCallback: (callback) => {
        return mongoose.model("TodoSchema").find({status: 'inactive'}, callback);
    }
};

// Static Method **********************************************************
TodoSchema.statics = {
    // Arrow function can not access $this keyword *********************
    findByJS: function () {
        return this.find({title: /js/i});
    }
}

// Query Helpers **********************************************************
TodoSchema.query = {
    // Arrow function can not access $this keyword *********************
    byLanguage: function (language) {
        // Use RegExp **********************************************
        return this.find({title: RegExp(language, 'i')});
    }
}

module.exports = mongoose.model('TodoSchema', TodoSchema);
