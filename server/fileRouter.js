const express = require('express');
const db = require('./db');

const fileRouter = express.Router();
const File = db.File;

module.exports = fileRouter