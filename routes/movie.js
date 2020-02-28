const   express = require('express'),
        movieController = require('../controllers/movie'),
        router = express.Router();

router.get('/', movieController.index);

router.get('/movies', movieController.getMovies);

router.get('/movie/:id', movieController.getMovieSingle)

module.exports = router;