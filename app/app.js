// 모듈
const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
let sql = require('./src/modles/sql.js');

const db = {
    database: "thanb",
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "1234"
};

const dbPool = require('mysql').createPool(db);

const PORT = 3000;

// 라우팅
const home = require('../app/src/routes');

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use("/", home); // use -> 미들 웨어 등록해주는 메서드.

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 // 쿠키 유효시간 1시간
    }
}));

// 서버 연동
const server = app.listen(PORT, () => {
    console.log(   `server starteed. port 3000.`);
});

// sql 변경 시 재시작 없음
fs.watchFile(__dirname + './src/modles/sql.js', (curr, prev) => {
    console.log('sql 변경시 재시작 없이 반영되도록 함');
    delete require.cache[require.resolve('./src/modles/sql.js')];
    sql = require('./src/modles/sql.js');
});


// TODO: reotes로 이동 시켜야함
app.post('/api/login', async(req, res) => {
    req.session['email'] = 'dbsgmlwl_@naver.com';
    res.send('okay');
});

app.post('/api/logout', async(req, res) => {
    req.session.destroy();
    res.send('ok');
});

// 로그인이 필요없는 경우
app.post('/api/:alias', async(req, res) => {
    try {
        res.send(await req.db(req.params.alias));
    } catch(err) {
        res.status(500).send({
            error: err
        });
    }
});

// 로그인이 필요한 경우
app.post('/api/:alias', async(req, res) => {
    if(!req.session.email){
        return res.status(401).send({
            error: 'You need to login.'});
    }
    
        try {
            res.send(await req.db(req.params.alias));
        } catch(err) {
            res.status(500).send({
                error: err
            });
        }
    });


const req = {
    async db(alias, param = [], where = '') {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
            if(error) {
                if(error.code != 'ER_DUP_ENTRY')
                    console.log(error);
                resolve({
                    error
                });
            } else resolve(rows);
        }));
    }
};