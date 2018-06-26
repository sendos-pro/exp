const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./log')(module);


// Инициализация
const app = express();


// Промежуточное ПО
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(cookieParser());


// Соединение с БД
const db = require('./utils/dataBaseUtils');
db.setUpConnection();


// Роуты
app.use(require('./routes/Default.routes.js'));
app.use(require('./routes/User.routes.js'));
app.use(require('./routes/Domain.routes.js'));
app.use(require('./routes/Tools.routes.js'));


// Если 404
app.use(function (req, res, next) {
    logger.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.status(404);
    res.json({
        error: 'Not found'
    });
    return;
});


// Обработчик ошибок
app.use(function (err, req, res, next) {
    logger.error('%s %d %s', req.method, res.statusCode, err.message);
    res.status(err.status || 500);
    res.json({
        error: "Some error occurred."
    });
    return;
});


module.exports = app;