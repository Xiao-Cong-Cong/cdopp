const logger = require('morgan');
const multer = require('multer');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const userRouter = require('./server/userRouter');

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
        // fileSize: 10 * 1024 * 1024
    }
})

app.post('/api/upload/file', upload.single('file'), (req, res) => {
    res.json({ success: true });
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