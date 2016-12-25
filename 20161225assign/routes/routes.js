var express = require('express');
var fs = require('fs');
var router = express.Router();
var app = express();

// 登录
router.get('/signin',function (req, res) {
      res.render('signin',{title: '登录页',text:''});
});

router.post('/signin',function (req, res) {
    fs.readFile('user.json',function (err,data) {
        var lister = JSON.parse(data.toString());
        var flag = lister.find(function (item) {
            return req.body.username == item.username && req.body.password == item.password
        });
        if(flag) {
            res.redirect('/user/welcome');
        } else {
            res.render('signin',{title:'登录页',text:'用户名或密码错误！'});
            console.log(req.cookies);
        }
    });

});
// 注册
router.get('/signup', function (req, res) {
    res.render('signup', {title: '注册页',text:''});
});
router.post('/signup', function (req, res) {
    fs.readFile('user.json',function (err,data) {
        if(data.toString()) {
            var lister = JSON.parse(data.toString());
            var flag = lister.find(function (item) {
                return req.body.username == item.username
            });
            if(!flag) {
                lister.push(req.body);
                res.cookie('users',lister);
                fs.writeFile('user.json', JSON.stringify(lister),function (err) {
                    console.log('错误信息：'+ err);
                    res.redirect('/user/signin');
                });
            } else {
                res.render('signup',{title:'注册页',text:'你已注册过！'});
                console.log(req.cookies.users);
            }
        } else {
            var list = [];
            list.push(req.body);
            res.cookie('users',list);
            fs.writeFile('user.json', JSON.stringify(list),function (err) {
                console.log('错误信息：'+ err);
                res.redirect('/user/signin');
            });
        }
    });
});

router.get('/welcome', function (req, res) {
   res.render('welcome', {title: '欢迎页'});
});
module.exports = router;

