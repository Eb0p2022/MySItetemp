const 
    User = require('../../models/user_model'),
    crypto = require('crypto'),
    loggedIn = require('../middlewares/loggedIn');

const user = {
    firstName: 'David',
    lastName: 'Adeyemi',
    username: 'Den_01'
}


exports.LogIn = (req, res, next) => {
    res.render('admin/adminLogIn', {
        pageTitle: 'Admin | Log In',
        isAuthenticated: false
    });
};

exports.postLogIn = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
        .then(user => {
            let userPasswordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
            if (userPasswordHash === user.password) {
                req.session.user = user;
                req.session.isLoggedIn = true;
                req.session.save();
                res.redirect('/admin/adminPage');
            }
            else {
                req.flash('error', 'Incorrect password!');
                res.redirect('/admin/adminLogIn');
            }
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Invalid user');
            res.redirect('/admin/adminLogIn');
        });
};

exports.logOut = (req, res, next) => {
    req.session.isLoggedIn = false;
    req.session.destroy();
    res.redirect('/');
}

exports.newAdmin = [loggedIn, (req, res, next) => {
    res.render('admin/newAdmin', {
        pageTitle: 'Create New Admin'
    });
}];

exports.createAdmin = (req, res, next) => {
    let hash = crypto.createHash('sha256');
    let encyptedPass = hash.update(req.body.password).digest('hex');
    let newAdmin = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: encyptedPass
    }

    User.findOne({
        username: newAdmin.username
    })
        .then(user => {
            if (user) {
                req.flash('error', 'User already exists.');
                return res.redirect('/admin/adminLogIn');
            }
            User.create(newAdmin)
                .then(newlyCreatedAdmin => {
                    req.flash('success', newlyCreatedAdmin.firstName + ', your account has been created! Please log in!' + '!');
                    res.redirect('/admin/adminLogIn');
                })
                .catch(err => {
                    console.log(err);
                    req.flash('error', 'Some error occured while creating the user. Please try again.')
                    res.redirect('/admin/newAdmin');
                });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'An error occurred. Please try again.');
        })
}