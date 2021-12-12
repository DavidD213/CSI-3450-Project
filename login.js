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
    res.render('playerTable');
});


//log in form
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


//Player insert form
app.post("/Player_Input",encoder, function(req,res){
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

// Team insert form
app.post("/team_input",encoder, function(req,res){
    var TEAM_ID = req.body.TEAM_ID;
    var TEAM_STATE = req.body.TEAM_STATE;
    var TEAM_NAME = req.body.TEAM_NAME;
    var TEAM_CONFERENCE = req.body.TEAM_CONFERENCE;

    

    
    var sql = 'insert into mydb.team(TEAM_ID, TEAM_STATE, TEAM_NAME, TEAM_CONFERENCE) Values ?';
    var values = [[TEAM_ID,TEAM_STATE,TEAM_NAME,TEAM_CONFERENCE]];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.redirect("/team");
   });


   
});

// Team Stats insert form
app.post("/team_status_input",encoder, function(req,res){
    var TEAMSTATS_ID = req.body.TEAMSTATS_ID;
    var TEAMSTATS_RECORD = req.body.TEAMSTATS_RECORD;
    var TEAMSTATS_PTS = req.body.TEAMSTATS_PTS;
    var TEAMSTATS_TOTALYARDS = req.body.TEAMSTATS_TOTALYARDS;
    var TEAMSTATS_YARDSALLOWED = req.body.TEAMSTATS_YARDSALLOWED;
    var TEAMSTATS_PTSALLOWED = req.body.TEAMSTATS_PTSALLOWED;
    var TEAMSTATS_TURNOVERS = req.body.TEAMSTATS_TURNOVERS;
    var TEAM_ID = req.body. TEAM_ID;
    

    
    var sql = 'insert into mydb.teamstats(TEAMSTATS_ID, TEAMSTATS_RECORD, TEAMSTATS_PTS,TEAMSTATS_TOTALYARDS, TEAMSTATS_YARDSALLOWED, TEAMSTATS_PTSALLOWED,TEAMSTATS_TURNOVERS, TEAM_ID) Values ?';
    var values = [[TEAMSTATS_ID,TEAMSTATS_RECORD,TEAMSTATS_PTS,TEAMSTATS_TOTALYARDS,TEAMSTATS_YARDSALLOWED,TEAMSTATS_PTSALLOWED,TEAMSTATS_TURNOVERS,TEAM_ID]];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.redirect("/team_status");
   });


});




// UPDATE THE CRUD
app.post("/Player_update",encoder, function(req,res){
    const playerId = req.body.PLAYER_ID;
    var sql = 'update mydb.player SET PLAYER_ID="'+req.body.PLAYER_ID+'", PLAYER_FNAME="'+req.body.PLAYER_FNAME+'", PLAYER_LNAME="'+req.body.PLAYER_LNAME+'", PLAYER_POSITION="'+req.body.PLAYER_POSITION+'", PLAYER_YEAR="'+req.body.PLAYER_YEAR+'", TEAM_ID="'+req.body.TEAM_ID+'" where PLAYER_ID='+playerId;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/CRUD_Player");
   });

});

app.post("/Team_update",encoder, function(req,res){
    const teamId = req.body.TEAM_ID;
    var sql = 'update mydb.team SET TEAM_ID="'+req.body.TEAM_ID+'", TEAM_STATE="'+req.body.TEAM_STATE+'", TEAM_NAME="'+req.body.TEAM_NAME+'", TEAM_CONFERENCE="'+req.body.TEAM_CONFERENCE+'" where TEAM_ID='+teamId;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/CRUD_Team");
   });

});
app.post("/Teamstat_update",encoder, function(req,res){
    const team_StatId = req.body.TEAMSTATS_ID;
    var sql = 'update mydb.teamstats SET TEAMSTATS_ID="'+req.body.TEAMSTATS_ID+'", TEAMSTATS_RECORD="'+req.body.TEAMSTATS_RECORD+'", TEAMSTATS_PTS="'+req.body.TEAMSTATS_PTS+'", TEAMSTATS_TOTALYARDS="'+req.body.TEAMSTATS_TOTALYARDS+'", TEAMSTATS_YARDSALLOWED="'+req.body.TEAMSTATS_YARDSALLOWED+'", TEAMSTATS_PTSALLOWED="'+req.body.TEAMSTATS_PTSALLOWED+'", TEAMSTATS_TURNOVERS="'+req.body.TEAMSTATS_TURNOVERS+'" where TEAMSTATS_ID='+team_StatId;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/CRUD_Team_Status");
   });

});

















//SELECT OPTIONS 


//Player Table 
app.get("/playerTable", (req, res) =>{
    connection.query('SELECT * FROM mydb.player',(err, rows) => {
         if (err) throw err;
         console.log(rows);
         res.render("playerTable",{
             player : rows
         });
    })
 });

// The Team Table
app.get("/team_Table", (req, res) =>{
   connection.query('SELECT * FROM mydb.team',(err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.render("team_Table",{
            team : rows
        });
   })
});


//The Team Stats Table
app.get("/team_status_Table", (req, res) =>{
    connection.query('SELECT * FROM mydb.teamstats',(err, rows) => {
         if (err) throw err;
         console.log(rows);
         res.render("team_status_Table", {
             team_status : rows
            });
    });
});


 
 app.get("/CRUD_Player", (req, res) =>{
    connection.query('SELECT * FROM mydb.player',(err, rows) => {
         if (err) throw err;
         console.log(rows);
         res.render("CRUD_Player",{
             CRUD_player : rows
         });
    });
 });

 app.get("/CRUD_Team", (req, res) =>{
    connection.query('SELECT * FROM mydb.team',(err, rows) => {
         if (err) throw err;
         console.log(rows);
         res.render("CRUD_Team",{
             CRUD_teams : rows
         });
    });
 });

 app.get("/CRUD_Team_Status", (req, res) =>{
    connection.query('SELECT * FROM mydb.teamstats',(err, rows) => {
         if (err) throw err;
         console.log(rows);
         res.render("CRUD_Team_Status",{
             CRUD_team_stat : rows
         });
    });
 });
app.get("/edit/:playerId",(req, res) => {
    const playerId = req.params.playerId;
    connection.query(`SELECT * FROM mydb.player where PLAYER_ID = ${playerId}`,(err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("CRUD_Edit_Player",{
            CRUD_player : result[0]
        });
    });
});
app.get("/edit1/:teamId",(req, res) => {
    const teamId = req.params.teamId;
    connection.query(`SELECT * FROM mydb.team where TEAM_ID = ${teamId}`,(err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("CRUD_Edit_Team",{
            CRUD_teams : result[0]
        });
    });
});

app.get("/edit2/:team_StatId",(req, res) => {
    const team_StatId = req.params.team_StatId;
    connection.query(`SELECT * FROM mydb.teamstats where TEAMSTATS_ID = ${team_StatId}`,(err, result) => {
        if (err) throw err;
        console.log(result);
        res.render("CRUD_Edit_Teamstat",{
            CRUD_team_stat : result[0]
        });
    });
});
        
//DELETE THE ROWS FROM THE CRUD

app.get('/delete/:playerId',(req, res) =>{
    const playerId = req.params.playerId;
    let sql = `DELETE FROM mydb.player WHERE PLAYER_ID = ${playerId}`;
    let query = connection.query(sql, (err, result) =>{
        if(err) throw err;
        res.redirect('/CRUD_Player');
    });
});
app.get('/delete1/:teamId',(req, res) =>{
    const teamId = req.params.teamId;
    let sql = `DELETE FROM mydb.team WHERE TEAM_ID = ${teamId}`;
    let query = connection.query(sql, (err, result) =>{
        if(err) throw err;
        res.redirect('/CRUD_Team');
    });
});
app.get('/delete3/:team_StatId',(req, res) =>{
    const team_StatId = req.params.team_StatId;
    let sql = `DELETE FROM mydb.teamstats WHERE TEAMSTATS_ID = ${team_StatId}`;
    let query = connection.query(sql, (err, result) =>{
        if(err) throw err;
        res.redirect('/CRUD_Team_Status');
    });
});








// when login is success
app.get("/Player",(req,res) => {
    res.render('Player');
});

app.get("/log_In",(req,res) => {
    res.render('log_In');
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
app.get("/playerTable",(req,res) => {
    res.render('playerTable');
});
app.get("/team_Table",(req,res) => {
    res.render('team_Table');
});
app.get("/team_status_Table",(req,res) => {
    res.render('team_status_Table');
});
app.get("/CRUD_Edit_Player",(req, res) =>{
    res.render("CRUD_Edit_Player")
})
app.get("/CRUD_Edit_Team",(req, res) =>{
    res.render("CRUD_Edit_Team")
})
app.get("/CRUD_Edit_Teamstat",(req, res) =>{
    res.render("CRUD_Edit_Teamstat")
})




// set app port 
app.listen(4500);