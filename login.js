/**
 * Created by Admin on 2016/12/24.
 */
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('views'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    saveUninitialized:true,//不管用不用都 进行初始化。
    secret:'zfpx' //加密cookie
}));
var list = [];
app.get('/', function (req, res) {
    //res.sendFile(path.resolve('assign.html'));
    res.render('assign', {title: '注册页'})
});
app.post('/assign', function (req, res) {
    list.push(req.body);
    res.redirect('/login');
});
app.get('/login', function (req, res) {
    res.render('login', {title: '登录页'});
    //res.sendFile(path.resolve('login.html'));
});
app.post('/loginup', function (req, res) {
    var flag = list.find(function (item) {
        return item.username == req.body.username && item.password == req.body.password;
    });
    if (flag) {
        //res.sendFile(path.resolve('ind.html'));
        res.render('welcome', {title: '欢迎页！'});
    } else {
        res.render('login', {title: '登录页'});
        //res.redirect('/login');
    }
});
app.listen(9988);

