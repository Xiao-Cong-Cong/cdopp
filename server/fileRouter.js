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
            status = 0;
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

GetLogsByUser = (req, res) => {
    if(req.session.user) {
        page = req.query.page ? req.query.page : 1;
        username = req.session.user.username;
        File.countDocuments({ username: username }, (err, total) => {
            if(err) console.log(err);
            console.log(' --- hi ---')
            File.find({ username: username }).skip(page*10-10).limit(10).exec((err, docs) => {
                if(err) console.log(err);
                res.json({
                    success: true,
                    total: total,
                    data: docs
                });
            });
        });
    } else {
        res.json({
            success: false,
            errorMessage: "尚未登陆"
        })
    }
}

GetLogsByAdmin = (req, res) => {
    page = req.query.page ? req.query.page : 1;
    status = req.query.status;
    username = req.query.username;
    if(req.session.user.level === 9) {
        File.countDocuments({ status: {$in: status}, username: new RegExp(username, "i") }, (err, total) => {
            if(err) console.log(err);
            File.find({ status: {$in: status}, username: new RegExp(username, "i") })
                .skip(page * 10 - 10).limit(10).exec((err, docs) => {
                if(err) console.log(err);
                res.json({
                    success: true,
                    total: total,
                    data: docs
                })
            })
        })
    } else {
        console.log("没有权限查看");
        res.json({
            success: false,
            errorMessage: "没有权限查看"
        })
    }
}

ConfirmPDFById = (req, res) => {
    if(req.session.user.level === 9) {
        var fid = req.query.fid;
        File.update({fid: fid}, {status: 1}, (err, doc) => {
            if(err) console.log(err);
            res.json({
                success: true
            });
        })
    } else {
        console.log("没有权限确认PDF");
        res.json({
            success: false,
            errorMessage: "没有权限确认PDF"
        });
    }
}

fileRouter.post('/submitPDF', SubmitPDF);
fileRouter.post('/modifyCopies', ModifyCopies);
fileRouter.get('/getLogsByUser', GetLogsByUser);
fileRouter.get('/getLogsByAdmin', GetLogsByAdmin);
fileRouter.get('/confirmPDFById', ConfirmPDFById);

module.exports = fileRouter