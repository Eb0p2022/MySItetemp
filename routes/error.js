const   express = require('express'),
        errorController = require('../controllers/error'),
        router = express.Router();

router.get('/', errorController.get404);