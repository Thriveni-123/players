const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');


var PORT=3002
var NODE_ENV = "development"
var DATABASE_HOST = "localhost"
var DATABASE_PORT = 3306
var DATABASE_USERNAME = "root"
var DATABASE_PASSWORD = "root"
var DATABASE_NAME = "playerinfo"


var Database = require("./database/database");
dotEnv.config();
const app = express();

app.use(cors()); // enable for using from other domain
app.use(express.json()); // help to parse content Type : "application/json"
app.use(express.urlencoded({extended: true})); // help to parse content Type : "application/x-www-form-urlencoded"

////// END MIDDLEWARE ///////


////////// BEGING DATABASE /////////////////////
Database.CreateConnectionPool(DATABASE_HOST,DATABASE_PORT,DATABASE_USERNAME,DATABASE_PASSWORD);
Database.CreateDatabase(DATABASE_NAME);
Database.InitializeDatabase(DATABASE_NAME);
////////// END DATABASE /////////////////////


////// BEGIN ROUTES //////////

app.use('/api/v1/user',require('./routes/playerRoutes'));

app.get('/',(req,res,next) =>{
    res.send('Hello from the server')
 });
 //////// END ROUTES /////////

 /////// START SERVER////////
 const PORT1 = PORT || 3000;
 app.listen(PORT1,() => {
    console.log('server listening on port '+PORT1);
 });
 
 //error handling middleware
 app.use(function (err, req, res, next) {
     console.error(err.stack)
     res.status(500).send({
       status: 500,
       message: err.message,
       body: {}
     });
   })
   
   


















