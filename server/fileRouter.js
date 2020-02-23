const express = require('express');
const db = require('./db');

const fileRouter = express.Router();
const File = db.File;

ModifyCopies = (req, res) => {
    fid = req.body.fid;
    copies = req.body.copies;

    File.findOne({ fid: fid }, (err, doc) => {
        if(err) console.log(err);
        if(!doc) {
            console.log("fid not found");
            res.json({
                success: false,
                errorMessage: "fid not found"
            })
        } else {
            price = doc.pages * copies * 20 / 100;
            File.updateOne({ fid: fid }, { copies: copies, price: price }, (err, doc) => {
                if(err) console.log(err);
                console.log("更新份数成功");
                res.json({
                    success: true
                })
            })
        }
    })
}

SubmitPDF = (req, res) => {
    fid = req.body.fid;
    console.log(' --- submit PDF --- ', fid);

    File.findOne({ fid: fid }, (err, doc) => {
        if(err) console.log(err);
        if(!doc) {
            console.log("fid not found");
            res.json({
                success: false,
                errorMessage: "fid not found"
            })
        } else {
            status = doc.status | 1 << 2;
            // console.log(doc.fid, status, doc)
            File.updateOne({ fid: doc.fid }, { status: status }, (err) => {
                if(err) console.log(err);
                console.log("PDF提交成功", doc.fid);
                res.json({
                    fid: doc.fid,
                    success: true
                })
            })
        }
    })
}

fileRouter.post('/modifyCopies', ModifyCopies);
fileRouter.post('/submitPDF', SubmitPDF);

module.exports = fileRouter