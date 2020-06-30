const Log = require('../../models/log'),
    Movie = require('../../models/movie'),
    User = require('../../models/user_model'),
    multer = require('multer'),
    path = require('path'),
    validations = require('../../util/validate'),
    TV = require('../../models/tv-show'),
    fs = require('fs');

const loggedIn = require('../middlewares/loggedIn')

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
let upload = multer({ storage: fileStorage });

exports.adminPage = [loggedIn, (req, res, next) => {
    let loggedInUser = req.session.user
    res.render('admin/admin-home', {
        pageTitle: 'Admin   |   ' + loggedInUser.username,
        user: loggedInUser,
        isAuthenticated: req.session.isLoggedIn
    });
}]

exports.addContent = [loggedIn, (req, res, next) => {
    res.render('admin/addContent', {
        pageTitle: `Add Content | ${user.username}`,
        user: req.session.user
    });
}]

exports.postContentMovie = (req, res, next) => {
    const movie_upload = upload.single('movie_image_file');
    movie_upload(req, res, async (err) => {
        if (err) {
            res.status(500).json({
                errors: ["Some error occurred with the file upload. Please try again."]
            })
                .end();
        }
        let imageFileLink = (req.file) ? req.file.filename : req.body.imageFileLink;
        let genres = (req.body.genre) ? req.body.genre : [];
        let denRatingFixed = (req.body.movie_den_rating) ? Number(req.body.movie_den_rating.trim()) : '0';
        let movieDoc = {
            title: req.body.movie_title.trim(),
            synopsis: req.body.movie_synopsis.trim(),
            downloadLink: req.body.movieFile_link.trim(),
            genres: genres,
            imageLink: imageFileLink,
            releaseYear: Number(req.body.release_year.trim()),
            ratings: {
                IMDB: req.body.movie_rating_IMDB.trim(),
                denReviews: {
                    ratings: denRatingFixed,
                    review: req.body.den_review
                }
            }
        }

        try {
            let errors = await validations.validateMovie(movieDoc);
            if (errors.length > 0) {
                console.log(errors);
                return res.status(500).json({
                    errors: errors
                });
            }
            let newMovie = await Movie.create(movieDoc);
            console.log(newMovie);
            return res.status(200).end();
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    });
};

exports.postContentTV = (req, res, next) => {
    const tv_upload = upload.single('tv_image_file');
    tv_upload(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: ["Some error occurred with the file upload. Please try again."]
            })
                .end();
        }
        let imageFileLink = (req.file) ? req.file.filename : req.body.tvFileLink;
        let genres = (req.body.genre) ? req.body.genre : [];
        let denRatingFixed = (req.body.tv_den_rating) ? Number(req.body.tv_den_rating.trim()) : '0';
        let tvDoc = {
            title: req.body.tv_title.trim(),
            synopsis: req.body.tv_synopsis.trim(),
            genres: genres,
            imageLink: imageFileLink,
            releaseYear: Number(req.body.tv_release_year.trim()),
            ratings: {
                IMDB: req.body.tv_rating_IMDB.trim(),
                denReviews: {
                    ratings: denRatingFixed
                }
            }
        };
        validations.validateTVShow(tvDoc)
            .then(errors => {
                if (errors.length > 0) {
                    console.log(errors);
                    return res.status(500).json({
                        errors: errors
                    });
                }
                TV.create(tvDoc)
                    .then(newShow => {
                        console.log(newShow);
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

exports.getUpdate = [loggedIn, (req, res, next) => {
    res.render('admin/contentUpdate', {
        pageTitle: 'Update Movie / TV Show',
        user: req.session.user
    })
}]

exports.getMovieUpdate = [loggedIn, (req, res, next) => {
    res.render('admin/updateMovie', {
        pageTitle: 'Update Movie',
        user: req.session.user,
        edit: false
    });
}]
