const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: String,
        username: String,
        actions: Array
    });

module.exports = mongoose.model('log', logSchema);