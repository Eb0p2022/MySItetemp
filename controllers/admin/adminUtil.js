const   Log = require('../../models/log'),
        Movie = require('../../models/movie'),
        multer = require('multer'),
        path = require('path'),
        validations = require('../../util/validate'),
        crypto = require('crypto'),
        TV = require('../../models/tv-show'),
        MovieDB = require('../../util/movie_api_queries'),
        fs = require('fs');

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

exports.postTVSearch = async (req, res, next) => {
    res.status(200);
    let response = await MovieDB.searchTV(req.params.searchParam);
    let payload = {
        error: ''
    }
    if(response.status == 200 && response.data.results.length != 0){
        payload.results = response.data
    } else {
        payload.error = 'The resource you requested could not be found.'
    }
    res.json(payload);
}