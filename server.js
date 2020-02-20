const logger = require('morgan');
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

app.use((req, res, next) => {
    var err = new Error('This page not found');
	err.status = 404;
	next(err)
});

app.listen(3000, () => {console.log('Server is running at 3000 ...')});