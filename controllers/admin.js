const   Log = require('../models/log'),
        passport = require('passport'),
        User = require('../models/user_model');
exports.LogIn = (req, res, next) => {
    res.render('admin/adminLogIn', {
        pageTitle: 'Admin | Log In'
    });
};

exports.postLogIn = [passport.authenticate('local', {
    failureRedirect: '/admin/adminLogIn',
    failureFlash: 'An error occurred. Please try again.'
}), 
    (req, res, next) => {
        let username = req.user.username;
        req.flash('success', 'Successfully logged in! Welcome, ' + username);
        Log.create(
            {
            id: req.user._id,
            date: Date(),
            user: username
        }, (err, newLog) => {
            if(err) {
                console.log(err);
            }else{
                let action = username + ' logged in.'
                newLog.actions.push(action);
                newLog.save();
                res.redirect('/admin/adminPage');
            }
        });
    }
];

exports.newAdmin = (req, res, next) => {
    res.render('admin/newAdmin', {
        pageTitle: 'Create New Admin'
    });
};

exports.createAdmin = (req, res, next) => {
    let newAdmin = {
        username: req.body.username
    }
    User.register(newAdmin, req.body.password, (err, newlyCreatedAdmin) => {
        if(err) {
            console.log(err.message);
            req.flash('error', err.message);
            return res.render('admin/newAdmin', {
                pageTitle: 'Admin   |   Create New Admin'
            });
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', newlyCreatedAdmin.username + ', your account has been created! Please log in!' + '!');
            res.redirect('/admin/adminLogIn');
        });
    });
};

exports.adminPage = (req, res, next) => {
    res.render('admin/adminPage', {
        pageTitle: 'Admin   |   ' + req.user.username
    });
};