const   Log = require('../../models/log'),
        Movie = require('../../models/movie'),
        multer = require('multer'),
        path = require('path'),
        validations = require('../../util/validate'),
        crypto = require('crypto'),
        TV = require('../../models/tv-show'),
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

exports.postTVSearch = (req, res, next) => {
    res.status(200);
    res.end();
}