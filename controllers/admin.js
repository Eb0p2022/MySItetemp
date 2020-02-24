const User = require('../models/user');
exports.LogIn = (req, res, next) => {
    res.render('admin/adminLogIn', {
        pageTitle: 'Admin | Log In'
    });
};

exports.postLogIn = (req, res, next) => {
    req.flash('success', 'Successfully logged in');
    res.redirect('/admin/adminLogIn');
};

exports.newAdmin = (req, res, next) => {
    res.render('admin/newAdmin', {
        pageTitle: 'Create New Admin'
    });
};

exports.createAdmin = (req, res, next) => {
    let newAdmin = {
        username: req.body.username,
        password: req.body.username
    }
    User
    .create(newAdmin)
    .then(newAdmin => {
        console.log(newAdmin, 'Admin succesfully created!');
        res.redirect('/admin/adminLogIn');
    }).catch(err => {
        console.log(err);
    });
};