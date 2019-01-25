const express = require('express');
const mysql = require('mysql');
const parser = require('body-parser');
const sqlSetup = require('./sql-setup');
const morgan = require('morgan');

const db = mysql.createConnection({
    host     : sqlSetup.host,
    user     : sqlSetup.username,
    password : sqlSetup.password,
    database : sqlSetup.database
});

db.connect((err)=>{
    if(err) throw err;
    console.log('MySQL database connected...');
});

const app = express();

app.use(morgan('dev')); //log incoming requests
app.use(parser.json());

app.get("/v1/invoices",(req,res,next)=>{
    let sql = 'SELECT * FROM invoices ';

    if(req.query.invoice_number){
        sql += 'WHERE invoice_number=\'' + req.query.invoice_number + '\' ';
        if(req.query.po_number){
            sql += ' AND po_number=\'' + req.query.po_number + '\' ';
        }
    } else if(req.query.po_number){
        sql += 'WHERE po_number=\'' + req.query.po_number + '\' ';
    }

    sql += 'ORDER BY created_at DESC ';

    db.query(sql,(err,result)=>{
        if(err) throw err;
        let limit = req.query.page_limit || 100;
        let start = req.query.page || 1;
        start -= 1;        
        res.send(result.slice(start,start+limit));
    });
});

app.post("/v1/invoices",(req,res,next)=>{
    let invoice = req.body;
    invoice.id = null;

    let sql = 'INSERT INTO invoices SET ?';
    let query = db.query(sql,invoice,(err,result) => {
        if(err) throw err;
        db.query('SELECT * FROM invoices WHERE id=\"?\"',result.insertId,(err,result)=>{
            if(err) throw err;
            res.send(result);
        });
    });
});

app.use((req,res)=>{
    res.status(404).json({
        message: 'Invalid endpoint!'
    });
});

app.listen('3000',()=>{
    console.log('Server started on port 3000');
});

module.exports = app;