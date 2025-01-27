const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const writeRouter = require('./routes/write');

const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', // 允许单个源
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
  // allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  // exposedHeaders: ['X-Custom-Header'], // 浏览器可以访问的响应头
  credentials: true // 是否允许发送Cookie
};

// view engine setup 查看引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/write', writeRouter);

// 捕获404并转发给错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理程序
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 返回错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
