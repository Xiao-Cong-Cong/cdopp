const fs = require('fs')
const db = require('./server/db');
const logger = require('morgan');
const multer = require('multer');
const express = require('express');
const { exec, execSync } = require('child_process');
const session = require('express-session');
const bodyParser = require('body-parser');
const userRouter = require('./server/userRouter');
const fileRouter = require('./server/fileRouter');

const app = express();
app.use(logger('dev'));
app.use(session({
    secret: 'sessiontest',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000
    }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', userRouter);
app.use('/api/file', fileRouter);

const upload = multer({
    dest: './uploads/',
    fileFilter: (req, file, callback) => {
        const allowedTypes = ['application/pdf', 'application/kswps'];

        if(!allowedTypes.includes(file.mimetype)) {
            const error = new Error("wrong file type");
            error.code = "LIMIT_FILE_TYPES";
            callback(error, false);
        }

        callback(null, true);
    },
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

app.post('/api/file/upload', upload.single('file'), (req, res) => {
    // rename the file: date_random_user.pdf
    var randomID = Math.floor(Math.random() * 90000) + 10000;
    var username = req.session.user ? req.session.user.username : 'anonymous';
    var filename = new Date() * 1 + '_' + randomID + '_' + username + '.pdf';
    fs.rename(req.file.path, req.file.destination +  filename, (err) => {
        if(err) {
            res.json({
                success: false,
                errorMessage: "重命名错误"
            })
        }
    });
    // read pages and write newFile in db
    exec('python ./server/getPDFPages.py ' + req.file.destination + filename, (err, stdout, stderr) => {
        if(err) {
            res.json({
                success: false,
                errorMessage: "获取页数错误"
            })
        } else {
            newFile = new db.File({
                pages: stdout,
                filename: filename,
                username: username,
                originalname: req.file.originalname
            });
            newFile.price = newFile.pages * 20 / 100;
            newFile.status |= 1 << 1;

            newFile.save(err => {
                if(err) console.log(err);
                res.json({
                    success: true,
                    file: newFile
                });
            })
        }
    })
})

app.use((err, req, res, next) => {
    if(err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({ error: "Only PDF are allowed" });
        return;
    }

    if(err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: "Too large. Max size is 10 MB" });
        return;
    }

    res.status(404).json({ error: "This page is not found" });
});

app.listen(3000, () => {console.log('Server is running at 3000 ...')});