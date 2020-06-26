const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: String
})

module.exports = mongoose.model('user', userSchema)