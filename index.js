const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password should be empty string else gives an access denied error
    password: '',
    database: 'nodemysql'
});

//connect to db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql connected...');
});

const app = express();

//create database through express routes
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

//create posts table
app.get('/Createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table posts created');
    });
});

//insert some data
app.get('/addpost1', (req, res) => {
    let post = { title: 'post one', body: 'this is post number one' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('new post created...');
    });
});

//insert some data
app.get('/addpost2', (req, res) => {
    let post = { title: 'post two', body: 'this is post number two' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('new post 2 created...');
    });
});

//select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('posts fetched...');
    });
});

//select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('single post fetched...');
    });
});

//update single post
app.get('/updatepost/:id', (req, res) => {
    let newtitle = 'updated title';
    let sql = `UPDATE posts SET title = '${newtitle}' WHERE id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('title updated...');
    });
});

//delete single post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = '${req.params.id}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('post deleted...');
    });
});

app.listen('3000', () => {
    console.log('sever started on port 3000');
});