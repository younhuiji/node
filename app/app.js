// 모듈
const express = require('express');
const app = express();

const home = require('./src/routes/index');
const hospital = require('./src/routes/hospitalRouter');
const board = require('./src/routes/boardRouter');
const eventBoard = require('./src/routes/eventRouter');
const inform = require('./src/routes/informRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/', home);
app.use('/hospital', hospital);
app.use('/board',  board);
app.use('/event', eventBoard);
app.use('/inform', inform);

module.exports = app;
