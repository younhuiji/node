const fs = require("fs");
const data = fs.readFileSync(__dirname + '/db.json');
const conf = JSON.parse(data);
const maria = require('mysql');

const connection = maria.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

module.exports = connection;
