const constants = require('../constants');
var Database = require("../database/database");
var nodemailer = require('nodemailer');

module.exports.Login =  async ({email,password},callback) => {
    try {
        await Database.connectionPool.getConnection(async function(err, connection){ 
             connection.changeUser({
                 database : Database.databaseName
             }, function(err) {
                 if (err) {
                     console.log("Database is not selected");
                     callback(new Error(err),null,null);
                 }
                 else { //if database is selected
                     //////////////////////////////
                     // check whether the user is already register 
                     var selectUserEmail = "SELECT *  FROM players WHERE email='"+email+"'";
                     connection.query(selectUserEmail, async function (err, result, fields) {// query
                         if (err){
                             console.log("Query  is not executed login");
                             callback(new Error(err),null,null);
                         }
                         else {
                             if(result.length==0) { //if no results send the responce 
                                callback(null,{},1)    
                            }
                            else { //if results is there 
                                    Object.keys(result).forEach(async function(key) {
                                      var  dbpassword=result[key].password;
                                      var login= result[key];
                                        if(dbpassword==password){   
                                            var selectLoginDetails ="SELECT user_id,first_name,last_name,email,flag,last_login_date FROM players WHERE email='"+email+"'";
                                            connection.query(selectLoginDetails,async function(err,result,fields){
                                                if(err){
                                                    console.log("Query  is not executed login");
                                                    callback(new Error(err),null,null);
                                                }else{
                                                    Object.keys(result).forEach(async function(key) {
                                                        var login= result[key];
                                                    callback(null,login,3); 
                                                    });
                                                }
                                            });                                 
                                        }
                                        else{
                                          callback(null,{},2);//type=3 means password not match
                                        }      
                                     });
                            }
                        }
                         });//end of connection.query
                      
                 } // end of if database is selected
             });//end of changeUser
             connection.release();//release the connection
         }); // end of getConnection              
 }catch(error){
     console.log('Something went wrong: Service: Login',error);
     callback(new Error(error),null,null);
 }
}