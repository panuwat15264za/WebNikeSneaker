
const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const path = require('path');
const mysql = require('mysql');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "finalweb"
})

con.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connect");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

app.post('/regisDB', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100), email VARCHAR(100), password VARCHAR(100))";
    let result = await queryDB(sql);
    sql = `INSERT INTO userInfo (username, email, password) VALUES ("${req.body.username}", "${req.body.email}", "${req.body.password}")`;
    result = await queryDB(sql);
    
    console.log("New record created successfullyone");
    return res.redirect('index.html');
})

app.get('/logout', (req,res) => {
    res.clearCookie('username');
    return res.redirect('index.html');
})

let tablename = "userinfo";
app.post('/checkLogin',async (req,res) => {
    let sql = `SELECT id, username, password FROM ${tablename}`;
    let result = await queryDB(sql);
    result = Object.assign({},result);
    console.log(result);
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    let obj = Object.keys(result);
    var isCorrect = false;
    for(var i = 0 ; i < obj.length ; i++){
        var datablock = result[obj[i]];
        var dataUsername = datablock.username;
        var dataPassword = datablock.password;
        if(dataUsername == username && dataPassword == password){
            console.log("ooo");
            isCorrect = true;
            res.cookie('username', username);
        }
    }
    console.log(isCorrect);
    if(isCorrect == true){
        console.log("Correct");
        return res.redirect('finalProject.html');
    }
    else{
        console.log("Wrong");
        return res.redirect('index.html?error=1');
    }
})

app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/index.html`);
});