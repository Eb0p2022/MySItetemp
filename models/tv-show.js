const mongoose = require('mongoose');

const tvSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageLink: String,
    synopsis: String,
    genres: Array,
    releaseYear: Number,
    ratings: {
        IMDB: String,
        denReviews: {
            ratings: Number,
            review: String
        }
    }
})

module.exports = mongoose.model('tv', tvSchema);