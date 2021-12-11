const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");
const { redirect } = require("express/lib/response");
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

app.post("/log",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from mydb.admin where username = ? and password = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/Player");
        } else {
            res.redirect("/log_In");
        }
        res.end();
    })
});

app.post("/Player",encoder, function(req,res){
    var PLAYER_ID = req.body.PLAYER_ID;
    var PLAYER_FNAME = req.body.PLAYER_FNAME;
    var PLAYER_LNAME = req.body.PLAYER_LNAME;
    var PLAYER_POSITION = req.body.PLAYER_POSITION;
    var PLAYER_YEAR = req.body.PLAYER_YEAR;
    var TEAM_ID = req.body.TEAM_ID;
    
    var sql = 'insert into mydb.player(PLAYER_ID, PLAYER_FNAME, PLAYER_LNAME, PLAYER_POSITION, PLAYER_YEAR, TEAM_ID) Values ?';
    var values = [[PLAYER_ID,PLAYER_FNAME,PLAYER_LNAME,PLAYER_POSITION,PLAYER_YEAR,TEAM_ID]];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.redirect("/Player");
   });

});


app.post("/team",encoder, function(req,res){
    var TEAM_ID = req.body.TEAM_ID;
    var TEAM_STATE = req.body.TEAM_STATE;
    var TEAM_NAME = req.body.TEAM_NAME;
    var TEAM_CONFERENCE = req.body.TEAM_CONFERENCE;
    var TEAMSTATS_ID = req.body.TEAMSTATS_ID;
    

    
    var sql = 'insert into mydb.team(TEAM_ID, TEAM_STATE, TEAM_NAME, TEAM_CONFERENCE, TEAMSTATS_ID) Values ?';
    var values = [[TEAM_ID,TEAM_STATE,TEAM_NAME,TEAM_CONFERENCE,TEAMSTATS_ID]];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.redirect("/team");
   });
   
});

        









// when login is success
app.get("/Player",(req,res) => {
    res.render('Player');
});


app.get("/team_status",(req,res) => {
    res.render('team_status');
});

app.get("/team",(req,res) => {
    res.render('team');
});
app.get("/CRUD_Player",(req,res) => {
    res.render('CRUD_Player');
});

app.get("/CRUD_Team",(req,res) => {
    res.render('CRUD_Team');
});
app.get("/CRUD_Team_Status",(req,res) => {
    res.render('CRUD_Team_Status');
});

// set app port 
app.listen(4500);