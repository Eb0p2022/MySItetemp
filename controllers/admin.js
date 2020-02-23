exports.LogIn = (req, res, next) => {
    res.render('admin/adminLogIn', {
        pageTitle: 'Admin | Log In'
    });
};

exports.postLogIn = (req, res, next) => {
    
};