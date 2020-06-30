const   adminUtil = require('../controllers/admin/adminUtil'),
        adminAuth = require('../controllers/admin/adminAuth'),
        adminContent = require('../controllers/admin/contentManagement')
        express = require('express'),
        router = express.Router();

router.get('/adminLogIn', adminAuth.LogIn);
router.post('/verifyLogin', adminAuth.postLogIn);
router.get('/logOut', adminAuth.logOut);

router.get('/newAdmin', ...(adminAuth.newAdmin));
router.post('/createAdmin', adminAuth.createAdmin);

router.get('/adminPage', ...(adminContent.adminPage));
router.get('/addContent', ...(adminContent.addContent));

router.post('/postContent/movie', adminContent.postContentMovie);
router.post('/postContent/tv', adminContent.postContentTV);

router.get('/updateContent', ...(adminContent.getUpdate));
router.get('/updateContent/movie', ...(adminContent.getMovieUpdate));

router.get('/searchTV/:searchParam', adminUtil.postTVSearch);

module.exports = router;