/**
 * Created by Admin on 2016/12/25.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var route = require('./routes/routes');
var app = express();
app.set('view engine', 'html');
app.set('views', path.resolve('tmpl'));
app.engine('html',require('ejs').__express);
app.use(cookieParser());
app.use(express.static(path.resolve('public')));
app.use(session({
    resave: true,
    saveUninitialized:true,//不管用不用都 进行初始化。
    secret:'zfpx' //加密cookie
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/user', route);
app.listen(9092);