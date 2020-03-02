const mongoose = require('mongoose')
const passportLocalStrategy = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})

userSchema.plugin(passportLocalStrategy)

module.exports = mongoose.model('user', userSchema)