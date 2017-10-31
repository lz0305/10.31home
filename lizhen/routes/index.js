var express = require('express');
var router = express.Router();
var mysql=require("mysql");
var con=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"lizhen"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    con.query(`SELECT * FROM info`,function (err,rows,fields) {
        res.send(rows)
    })
});

router.post('/add', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    console.log(req.body)
    con.query(`INSERT INTO info(name,message) VALUES('${req.body.sc}','${req.body.sx}')`,function () {
        res.send("添加成功")
    })
});

router.post('/del', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    con.query(`DELETE FROM info WHERE id=${req.body.id}`,function (err,rows,fields) {
        res.send("删除成功")
    })
});

module.exports = router;
