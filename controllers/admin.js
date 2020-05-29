const   Log = require('../models/log'),
        User = require('../models/user_model'),
        Movie = require('../models/movie'),
        multer = require('multer'),
        path = require('path'),
        validations = require('../util/validate'),
        hash = require('crypto').createHash,
        fs = require('fs');

const user = {
    firstName: 'David',
    lastName: 'Adeyemi',
    username: 'Den_01'
}

const loggedIn = (req, res, next) => {
    if(req.session.isLoggedIn){
        return next();
    }
    req.flash('error', 'Please log in!');
    res.redirect('/admin/adminLogIn');
}

const downloadsDir = path.join(__dirname, '../uploads');
const imageDir = path.join(downloadsDir, 'images');
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.exists(downloadsDir, (exists) => {
            if (!exists) {
                fs.mkdirSync(downloadsDir);
            }
            let dirPath = path.join(downloadsDir, 'images');
            fs.exists(dirPath, (exists) => {
                if (exists) {
                    return cb(null, dirPath);
                }
                fs.mkdir(dirPath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    cb(null, dirPath);
                });
            });
        })
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: fileStorage }).single('image_file');

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
        let userPasswordHash = hash('sha256').update(req.body.password).digest('hex');
        if (userPasswordHash === user.password){
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save();
            res.redirect('/admin/adminPage');
        }
        else{
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

exports.newAdmin = [loggedIn, (req, res, next) => {
    res.render('admin/newAdmin', {
        pageTitle: 'Create New Admin'
    });
}];

exports.createAdmin = (req, res, next) => {
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
        if(user){
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

exports.adminPage = [loggedIn, (req, res, next) => {
    res.render('admin/admin-home', {
        pageTitle: 'Admin   |   ' + user.username,
        user: user,
        isAuthenticated: req.session.isLoggedIn
    });
}]

exports.addContent = (req, res, next) => {
    res.render('admin/addContent', {
        pageTitle: `Add Content | ${user.username}`,
        user: user
    });
}

exports.postContent = (req, res, next) => {
    upload(req, res, (err) => {
        if(err){
            res.status(500).json({
                errors: ["Some error occurred with the file upload. Please try again."]
            })
            .end();
        }
        let imageFileLink = (req.file) ? req.file.filename : req.body.imageFileLink;
        let genres = (req.body.genre) ? req.body.genre : [];
        let denRatingFixed = (req.body.den_rating) ? Number(req.body.den_rating.trim()) : '0';
        let movieDoc = {
            title: req.body.movie_title.trim(),
            synopsis: req.body.movie_synopsis.trim(),
            downloadLink: req.body.movieFile_link.trim(),
            genres: genres,
            imageLink: imageFileLink,
            releaseYear: Number(req.body.release_year.trim()),
            ratings: {
                IMDB: req.body.rating_IMDB.trim(),
                denReviews: {
                    ratings: denRatingFixed,
                    review: req.body.den_review
                }
            }
        }
        validations.validateMovie(movieDoc)
        .then(errors => {
            if(errors.length > 0){
                // let json_errors = JSON.stringify({
                //     errors: errors
                // });
                // console.log(json_errors);
                console.log(errors);
                return res.status(500).json({
                    errors: errors
                });
            }
            Movie.create(movieDoc)
            .then(newMovie => {
                console.log(newMovie);
                return res.status(200).end();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).end();
        });
    });
};