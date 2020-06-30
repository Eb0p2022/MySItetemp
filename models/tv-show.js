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
    }, 
    episodes: [{
        episode_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Episode'
        }
    }]
})

module.exports = mongoose.model('tv', tvSchema);