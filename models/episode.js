const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    number: {
        type: Number,
        required: true
    },
    downloadLink: {
        type: String,
        required: true
    },
    tv_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tv"
    },
    reviews: {
        IMDB: String,
        denReviews: {
            ratings: Number,
            review: String
        }
    }
})

module.exports = mongoose.model('episode', episodeSchema);