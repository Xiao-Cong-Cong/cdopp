const express = require('express');
const db = require('./db');

const payRouter = express.Router();
const Pay = db.Pay;
const User = db.User;

Data = (req, res) => {
    if(req.session.user) {
        User.findOne({ username: req.session.user.username }, (err, doc) => {
            if(err) console.log(err);
            res.json({
                success: true,
                alipayAccount: doc.alipayAccount,
                realname: doc.realname
            })
        })
    } else {
        res.json({
            success: false,
            errorMessage: "用户尚未登陆"
        })
    }
}

Recharge = (req, res) => {
    if(req.session.user) {
        amount = req.body.amount;
        realname = req.body.realname;
        username = req.session.user.username;
        alipayAccount = req.body.alipayAccount;
        var newPay = new Pay({
            username: username,
            amount: amount,
            realname: realname,
            alipayAccount: alipayAccount,
        });
        console.log(" ------ 1 ------");
        newPay.save(err => {
            if(err) console.log(err);
            console.log("充值申请提交成功");
            User.updateOne({username: username}, {realname: realname, alipayAccount: alipayAccount}, (err, doc) => {
                if(err) console.log(err);
                console.log("更新个人支付信息成功");
                res.json({
                    success: true
                })
            })
        })
    } else {
        res.json({
            success: false,
            errorMessage: "用户尚未登陆，请刷新重试"
        })
    }
}

GetLogsByUser = (req, res) => {
    if(req.session.user) {
        page = req.query.page ? req.query.page : 1;
        username = req.session.user.username;
        Pay.countDocuments({ username: username }, (err, total) => {
            if(err) console.log(err);
            Pay.find({ username: username }).skip(page*10-10).limit(10).exec((err, docs) => {
                if(err) console.log(err);
                res.json({
                    success: true,
                    total: total,
                    data: docs
                })
            })
        })
    } else {
        res.json({
            success: false,
            errorMessage: "尚未登陆"
        })
    }
}

GetLogsByAdmin = (req, res) => {
    if(req.session.user && req.session.user.level === 9) {
        page = req.query.page ? req.query.page : 1;
        status = req.query.status;
        username = req.query.username;
        Pay.countDocuments({ status: {$in: status}, username: new RegExp(username, "i") }, (err, total) => {
            if(err) console.log(err);
            Pay.find({ status: {$in: status}, username: new RegExp(username, "i") })
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
        res.json({
            success: false,
            errorMessage: "没有权限查看"
        })
    }
}

Confirm = (req, res) => {
    if(req.session.user && req.session.user.level === 9) {
        var pid = req.query.pid;
        Pay.findOne({pid, pid}, (err, doc) => {
            var username = doc.username;
            var amount = doc.amount;
            console.log(username, amount);
            User.updateOne({ username: username }, { $inc: { balance: amount }}, (err, doc) => {
                if(err) console.log(err);
                Pay.updateOne({pid: pid}, {status: 1}, (err, doc) => {
                    if(err) console.log(err);
                    res.json({
                        success: true
                    });
                });
            });
        });
    } else {
        console.log("没有权限确认充值");
        res.json({
            success: false,
            errorMessage: "没有权限确认充值"
        });
    }
}

Cancel = (req, res) => {
    if(req.session.user && req.session.user.level === 9) {
        var pid = req.query.pid;
        Pay.updateOne({pid: pid}, {status: 2}, (err, doc) => {
            if(err) console.log(err);
            res.json({
                success: true
            });
        });
    } else {
        console.log("没有权限取消充值");
        res.json({
            success: false,
            errorMessage: "没有权限取消充值"
        });
    }
}

payRouter.get('/data', Data);
payRouter.post('/recharge', Recharge);
payRouter.get('/getLogsByUser', GetLogsByUser);
payRouter.get('/getLogsByAdmin', GetLogsByAdmin);
payRouter.get('/confirm', Confirm);
payRouter.get('/cancel', Cancel);

module.exports = payRouter