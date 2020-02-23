exports.getMovies = (req, res, next) => {
	res.render('movies', {
		pageTitle: 'Movies'
	});
};

exports.index = (req, res, next) => {
	res.render('home', {
		pageTitle: 'The Den | Home'
	});
};