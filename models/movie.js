const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: String,
	synopsis: String,
	review: String,
	fileLink: String,
	genre: String,
	image: String,
	ratings: {
		IMDB: String,
		rottenTomatoes: String, 
		googleReviews: String,
		denReviews: {
			ratings: String,
			text: String
		}
	},
	id: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('movie', movieSchema);