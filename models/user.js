const   mongoose = require('mongoose'),
        passportLocalStrategy = require('passport-local-mongoose'),
        userSchema = mongoose.Schema({
            username: String,
            password: String
        });

userSchema.plugin(passportLocalStrategy);

module.exports = mongoose.model('user', userSchema)