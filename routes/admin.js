const   adminController = require('../controllers/admin'),
        express = require('express'),
        router = express.Router();

router.get('/adminLogIn', adminController.LogIn);

module.exports = router;