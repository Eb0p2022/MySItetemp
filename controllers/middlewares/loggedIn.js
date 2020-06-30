const loggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    }
    req.flash('error', 'Please log in!');
    res.redirect('/admin/adminLogIn');
}

module.exports = loggedIn