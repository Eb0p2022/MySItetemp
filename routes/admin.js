const   adminController = require('../controllers/admin'),
        express = require('express'),
        passport = require('passport'),
        router = express.Router();

router.get('/adminLogIn', adminController.LogIn);
router.post('/verifyLogin', adminController.postLogIn);

router.get('/adminPage', adminController.adminPage);
router.get('/addContent', adminController.addContent);

router.post('/postContent', adminController.postContent);

router.get('/newAdmin', adminController.newAdmin);
router.post('/createAdmin', adminController.createAdmin);

module.exports = router;