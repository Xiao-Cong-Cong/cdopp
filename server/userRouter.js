const express = require('express');
const db = require('./db');

const userRouter = express.Router();
const User = db.User;

const usernameReg = /^[a-zA-Z]\w{4,19}$/;
const passwordReg = /^[0-9a-zA-Z!@#()_,.]{5,30}$/;

Register = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if(!usernameReg.test(username)) {
        console.log("please check your user name [0-9a-zA-Z].");
        res.json({
            success: false,
            errorMessage: "please check your user name [0-9a-zA-Z]."
        })
    } else if(!passwordReg.test(password)) {
        console.log("please check your password [0-9a-zA-Z!@#()_,.].");
        res.json({
            success: false,
            errorMessage: "please check your password [0-9a-zA-Z!@#()_,.]."
        })
    } else {
        newUser = new User({
            username: username,
            password: password,
            level: 1,
            balance: 0
        });
    
        User.findOne({ username: username }, (err, doc) => {
            if(err) console.log(err);
            if(doc) {
                console.log("帐号已注册");
                res.json({
                    success: false,
                    errorMessage: "帐号已注册"
                })
            } else {
                newUser.save(err => {
                    if(err) console.log(err);
                    console.log("注册成功");
                    req.session.user = {
                        login: 1,
                        level: newUser.level,
                        username: newUser.username
                    }
                    res.json({
                        success: true
                    })
                })
            }
        })
    }
}

Login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if(!usernameReg.test(username)) {
        console.log("please check your user name [0-9a-zA-Z].");
        res.json({
            success: false,
            errorMessage: "please check your user name [0-9a-zA-Z]."
        })
    } else if(!passwordReg.test(password)) {
        console.log("please check your password [0-9a-zA-Z!@#()_,.].");
        res.json({
            success: false,
            errorMessage: "please check your password [0-9a-zA-Z!@#()_,.]."
        })
    } else {
        User.findOne({ username: username }, (err, doc) => {
            if(err) console.log(err);
            if(!doc) {
                console.log("帐号不存在");
                res.json({
                    success: false,
                    errorMessage: "帐号不存在"
                })
            } else if(doc.password === password) {
                console.log("登陆成功");
                req.session.user = {
                    login: 1,
                    level: doc.level,
                    balance: doc.balance,
                    username: doc.username
                }
                res.json({
                    success: true,
                    level: doc.level,
                    balance: doc.balance,
                    username: doc.username
                })
            } else {
                console.log("密码错误")
                res.json({
                    success: false,
                    errorMessage: "密码错误"
                })
            }
        })
    }
}

Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
        else {
            res.json({
                success: true
            })
        }
    })
}

Modify = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var password_old = req.body.password_old;

    if(!usernameReg.test(username)) {
        console.log("please check your user name [0-9a-zA-Z].");
        res.json({
            success: false,
            errorMessage: "please check your user name [0-9a-zA-Z]."
        })
    } else if(!passwordReg.test(password)) {
        console.log("please check your password [0-9a-zA-Z!@#()_,.].");
        res.json({
            success: false,
            errorMessage: "please check your password [0-9a-zA-Z!@#()_,.]."
        })
    } else if(!passwordReg.test(password_old)) {
        console.log("please check your old password [0-9a-zA-Z!@#()_,.].");
        res.json({
            success: false,
            errorMessage: "please check your old password [0-9a-zA-Z!@#()_,.]."
        })
    } else {
        User.findOne({ username: username, password: password_old }, (err, doc) => {
            if(err) console.log(err);
            if(!doc) {
                console.log("原始密码错误");
                res.json({
                    success: false,
                    errorMessage: "原始密码错误"
                })
            } else {
                User.updateOne({username: username}, {password: password}, (err, doc) => {
                    if(err) console.log(err);
                    console.log("更新密码成功");
                    res.json({
                        success: true
                    })
                })
            }
        })
    }
}

// page
Info = (req, res) => {
    // console.log(req.session);
    if(req.session.user.level === 9) {
        User.find((err, users) => {
            if(err) console.log(err);
            // console.log(users);
            res.json({
                success: true,
                data: users
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

Data = (req, res) => {
    console.log(req.session.user);
    if(req.session.user) {
        res.json({
            success: true,
            data: req.session.user
        });
    } else {
        res.json({
            success: false
        })
    }
}

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);
userRouter.post("/modify", Modify);
userRouter.get("/info", Info);
userRouter.get("/data", Data);

module.exports = userRouter