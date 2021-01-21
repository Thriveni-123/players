var mysql = require('mysql');
const readline = require('readline');
const fs = require('fs');

class Database {
   static connectionPool;
   static databaseName;
    static CreateConnectionPool (hostname,port,username,password) {
        Database.connectionPool =  mysql.createPool({
            connectionLimit: 100,
            host : hostname,
            port : port,
            user : username,
            password: password
            });
    }

    static CreateDatabase(databasename) {
            
        Database.databaseName = databasename;
       // console.log("Creating database : ",databasename);
        Database.connectionPool.getConnection(function(err, connection){    
            connection.query("CREATE DATABASE IF NOT EXISTS "+databasename, function (err, result) {
                if (err){
                   console.log(err);
                   console.log("Database not created");
                   //throw err
                }else {
                  //  console.log("CREATE DATABASE IF NOT EXISTS "+databasename);
                }
              });
            connection.release();//release the connection
          });
    }

    static InitializeDatabase(databasename) {
        try {  
                Database.connectionPool.getConnection(function(err, connection){  
                    
                    connection.changeUser({
                        database : databasename
                      }, function(err) {
                        if (err) {
                           // console.log(err);
                            console.log("Database is not selected");
                           // throw err
                        }else {
                            //console.log("Database is selected");

                            /////////////Reading file and executing the query
                             ///////// Open database file ///////////////////
                            let rl = readline.createInterface({
                                input: fs.createReadStream('./database/database.txt')
                            });

                            ////////// Read each line and execute the query
                            rl.on('line', function(line) {
                               // console.log(line);
                                try {
                                    connection.query(line, function (err, result) {
                                        if (err){
                                        //console.log(err);
                                        //console.log("Query  is not executed");
                                        //throw err
                                        }else {
                                        // console.log("Database created");
                                        }
                                    });
                                }catch(e){
                                    console.log('Error:', e.stack);
                                }
                            });
                            ////////////// ///////////////////////////////// 

                            // ////////// Cloe file
                            rl.on('close', function(line) {
                    
                            })


                            /////////////////////////////////////////////////

                        }
                    });//end of changeUser
                    
                    connection.release();//release the connection
                }); // end of getConnection
        } catch(e) {
            //console.log('Error:', e.stack);
        }
  }

}

module.exports = Database; 