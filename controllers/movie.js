const Movie = require('../models/movie');

exports.getMovies = (req, res, next) => {
	res.render('movies', {
		pageTitle: 'Movies'
	});
};

exports.index = (req, res, next) => {	
	Movie.find((err, movies) => {
		res.render('home', {
			pageTitle: 'The Den | Home',
			movies: movies
		});
	});
};

exports.getMovieSingle = (req, res) => {
	let movieID = req.params.id;
	Movie.findById(movieID, (err, foundMovie) => {
		if (err) {
			console.log(err);
			res.redirect('/movies');
		}
		res.render('movie-single', {
			pageTitle: foundMovie.title,
			movie: foundMovie
		});
	});
};