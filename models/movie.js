const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	synopsis: {
		type: String,
		required: true
	},
	downloadLink: {
		type: String,
		required: true
	},
	genres: [],
	imageLink: {
		type: String,
		required: false
	},
	releaseYear: {
		type: Number,
		required: true
	},
	ratings: {
		IMDB: {
			type: String,
			required: false
		},
		denReviews: {
			ratings: {
				type: Number,
				required: false
			},
			review: {
				type: String,
				required: false
			}
		}
	}
});

module.exports = mongoose.model('movie', movieSchema);