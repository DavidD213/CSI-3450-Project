﻿# CSI-3450-Project
1.) First we need to make sure that all the dependencies and sql, node.js, and express extensions are downloaded using the terminal from Visual Studio Code in order to use the node.js and express to be able launch the webpage.
2.) Second we have to make sure that we have mysql workbench community edition downloaded so that we can create our database. Also make sure that the football database ERD is downloaded as well from the GitHub.
3.) Next we have to create connection with our database using:
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
4.) Once you have established a connection with the Database then you have to make sure that your database is engineered into queries therefore you need to make sure that your ERD is forward engineered into the SQL queries. and if you have the script we can reverse engineer it to the ERD diagram.
5.) The last step will be to download our code and make sure that the password and username is the same as their MySQL server so that once they establish a connection with their database all they need to do next is.
6.) Go to the terminal and type (node login.js) in there terminal and launch our webpage that will Create, Read, Update, and Delete your database.
