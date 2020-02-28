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
	Movie.findOne({
		id: movieID
	}, (err, foundMovie) => {
		if(err) {
			console.log(err);
			res.redirect('/movie')
		}
		res.render('movie-single', {
			pageTitle: 'Single Movie'
		});

	})
};