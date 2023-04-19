const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 // 쿠키 유효시간 1시간
    }
}));

const server = app.listen(3000, () => {
    console.log(   `server starteed. port 3000.`);
});

const db = {
    database: "thanb",
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "1234"
};

const dbPool = require('mysql').createPool(db);

app.post('/api/login', async(req, res) => {
    req.session['email'] = 'dbsgmlwl_@naver.com';
    res.send('okay');
});

app.post('/api/logout', async(req, res) => {
    req.session.destroy();
    res.send('ok');
});

const sql = require('./src/modles/sql.js');

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