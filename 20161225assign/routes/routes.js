var express = require('express');
var fs = require('fs');
var router = express.Router();
var app = express();

// 登录
router.get('/signin',function (req, res) {
    var info = '';
    if(req.session.error) {
        info = req.session.error
    }
    res.render('signin',{title: '登录页',text:info});
});

router.post('/signin',function (req, res) {
    fs.readFile('user.json','utf8',function (err,data) {
        var lister = JSON.parse(data);
        var flag = lister.find(function (item) {
            return req.body.username == item.username && req.body.password == item.password
        });
        if(flag) {
            req.session.error = '';
            res.redirect('/user/welcome');
        } else {
            req.session.error = '用户名或密码错误！';
            res.redirect('/user/signin');
            //res.render('signin',{title:'登录页',text:'用户名或密码错误！'});
            //console.log(req.cookies);
        }
    });

});
// 注册
router.get('/signup', function (req, res) {
    var info = '';
    if(req.session.error) {
    info = req.session.error
    }
    res.render('signup', {title: '注册页',text:info});
});
router.post('/signup', function (req, res) {
    fs.readFile('user.json','utf8',function (err,data) {
        if(data) {
            var lister = JSON.parse(data);
            var flag = lister.find(function (item) {
                return req.body.username == item.username
            });
            if(!flag) {
                if(req.body.username && req.body.password) {
                    lister.push(req.body);
                    res.cookie('users',lister);
                    fs.writeFile('user.json', JSON.stringify(lister),function (err) {
                        console.log('错误信息：'+ err);
                        res.redirect('/user/signin');
                    });
                    req.session.error = '';
                    console.log(req.session.error);
                } else {
                    req.session.error = '注册信息不能为空';
                    res.redirect('/user/signup');
                    //res.render('signup',{title:'注册页',text:'注册信息不能为空'});
                    //console.log(req.cookies.users);
                }
            } else {
                req.session.error = '你已注册过';
                res.redirect('/user/signup');
                //res.render('signup',{title:'注册页',text:'你已注册过！'});
                //console.log(req.cookies.users);
            }
        } else {
            var list = [];
            if(req.body.username && req.body.password) {
                list.push(req.body);
                res.cookie('users',list);
                fs.writeFile('user.json', JSON.stringify(list),function (err) {
                    console.log('错误信息：'+ err);
                    res.redirect('/user/signin');
                });
            } else {
                req.session.error = '注册信息不能为空';
                res.redirect('/user/signup');
                //res.render('signup',{title:'注册页',text:'注册信息不能为空'});
                //console.log(req.cookies.users);
            }
        }
    });

});

router.get('/welcome', function (req, res) {
    res.render('welcome', {title: '欢迎页'});
});
module.exports = router;

