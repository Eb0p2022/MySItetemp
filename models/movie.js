const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: String,
	synopsis: String,
	fileLink: String,
	genres: [],
	image: String,
	releaseDate: Number,
	ratings: {
		IMDB: String,
		rottenTomatoes: String, 
		googleReviews: String,
		denReviews: {
			ratings: String,
			text: String
		}
	}
});

module.exports = mongoose.model('movie', movieSchema);