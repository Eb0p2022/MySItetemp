const   express = require('express'),
        movieController = require('../controllers/movie'),
        router = express.Router();

router.get('/', movieController.index);

router.get('/movies', movieController.getMovies);

router.get('/movie-single', (req, res) => {
    res.render('movie-single', {
        pageTitle: 'Single Movie'
    });
})

module.exports = router;