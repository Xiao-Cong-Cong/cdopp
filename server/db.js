const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/cdopp';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

connect.then((db) => {
    console.log("Connected correctly to the db server");
}, (err) => {console.log(err);});

const Schema = mongoose.Schema;

let userID = 1;

const userSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true,
        default: () => userID++
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0
    }
},{
    timestamps: true
});

let fileID = 1;

const fileSchema = new Schema({
    fid: {
        type: Number,
        required: true,
        unique: true,
        default: () => fileID++
    },
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String
    },
    pages: {
        type: Number,
        required: true,
        default: 0
    },
    copies: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    },
    // 0-submitted, 1-permitted, 2-printing, 3-printed, 4-failed
    status: {
        type: Number,
        required: true,
        default: 4
    },
    username: {
        type: String,
        required: true,
        default: 'anonymous'
    },
    submit_time: {
        type: Date,
        required: true,
        default: Date.now
    }
})

var db = {
    User: mongoose.model('User', userSchema),
    File: mongoose.model('File', fileSchema)
}

module.exports = db

