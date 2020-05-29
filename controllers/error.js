exports.get404 = (req, res, next) => {
    res.status(404).render('error', { 
        pageTitle: 'Page Not Found', 
        path: '/404' , 
        pageTitle: 'Invalid route',
        isAuthenticated: req.session.isLoggedIn
    });
};
