const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: String,
        user: String,
        actions: Array
    });

module.exports = mongoose.model('log', logSchema);