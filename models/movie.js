const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: String,
	synopsis: String,
	review: String,
	fileLink: String,
	ratings: {
		IMDB: String,
		rottenTomatoes: String, 
		googleReviews: String,
		denReviews: String
	},
	id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('movie', movieSchema);