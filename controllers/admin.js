const   passport = require('passport'),
        User = require('../models/user');
exports.LogIn = (req, res, next) => {
    res.render('admin/adminLogIn', {
        pageTitle: 'Admin | Log In'
    });
};

exports.postLogIn = (req, res, next) => {
    //  Logic to handle login
    req.flash('success', 'Successfully logged in!');
    res.render('admin/adminPage', {
        pageTitle: 'Admin Page  |   Welcome'
    });
};

exports.newAdmin = (req, res, next) => {
    res.render('admin/newAdmin', {
        pageTitle: 'Create New Admin'
    });
};

exports.createAdmin = (req, res, next) => {
    let newAdmin = {
        username: req.body.username
    }
    User
    .register(newAdmin, req.body.password)
    .then(newlyCreatedAdmin => {
        passport.authenticate('local', () => {
            console.log(newlyCreatedAdmin, 'Admin succesfully created!');
            res.redirect('/admin/adminLogIn');
        })
    }).catch(err => {
        req.flash('error', err.message);
        res.render('admin/newAdmin');
    });
};