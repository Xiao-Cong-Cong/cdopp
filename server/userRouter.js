const express = require('express');
const User = require('./db');

const userRouter = express.Router();

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
            level: 1
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
                    username: doc.username
                }
                res.json({
                    success: true,
                    level: doc.level,
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
        User.update({username: username}, {password: password}, function(err, doc) {
            if(err) console.log(err);
            console.log("更新密码成功");
            res.json({
                success: true
            })
        })
    }
}

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);
userRouter.post("/modify", Modify);

module.exports = userRouter