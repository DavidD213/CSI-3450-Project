const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();



const app = express();
app.use(express.static('public'))
app.use('/css',express.static(__dirname+ 'public/css'));
app.use('/js',express.static(__dirname+ 'public/js'));
app.use('/img',express.static(__dirname+ 'public/img'));
app.use('/scss',express.static(__dirname+ 'public/scss'));
app.use('/vendor',express.static(__dirname+ 'public/vender'));


//Set Views
app.set('views', './views');
app.set('view engine', 'ejs');



const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Fcbayern1",
    database: "mydb"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("",(req,res) => {
    res.render('log_In');
});

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from mydb.user where username = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/Player");
        } else {
            res.redirect("/log_In");
        }
        res.end();
    })
})

// when login is success
app.get("/Player",(req,res) => {
    res.render('Player');
});


app.get("/team_status",(req,res) => {
    res.render('team_status');
});


// set app port 
app.listen(4500);