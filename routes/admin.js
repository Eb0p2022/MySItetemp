const   adminController = require('../controllers/admin'),
        express = require('express'),
        router = express.Router();

router.get('/adminLogIn', adminController.LogIn);
router.post('/verifyLogin', adminController.postLogIn);

router.get('/adminPage', ...(adminController.adminPage));
router.get('/addContent', ...(adminController.addContent));

router.post('/postContent/movie', adminController.postContentMovie);
router.post('/postContent/tv', adminController.postContentTV);

router.get('/updateContent', ...(adminController.getUpdate));
router.get('/updateContent/movie', ...(adminController.getMovieUpdate));

router.get('/newAdmin', ...(adminController.newAdmin));
router.post('/createAdmin', adminController.createAdmin);

router.get('/logOut', adminController.logOut);

router.post('/searchMedia/:mediaType/:searchParam', adminController.postSearchMedia);

module.exports = router;