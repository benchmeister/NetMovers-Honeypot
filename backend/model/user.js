//-----------------------------------------------------------------------
// load modules
//-----------------------------------------------------------------------
var db = require('../config/db.js');

//-----------------------------------------------------------------------
// functions
//-----------------------------------------------------------------------
var user = {
    verify: function (username, password, callback) {
      const query = "SELECT * FROM user WHERE username=? and password=?"
      dbConn = db.getConnection()
      .then(dbConn => {
        dbConn.query(query, [username, password], function (error, results) {
          dbConn.close()
          console.log(results)
          if (error) {
            console.log(error)
            return callback(error, null);
          }
          else{
            if (results.length === 0) {
              return callback(null, null)  
            } 
            else {
              const user = results[0];
              return callback(null, user);
            }
          }
        });
      })

    },

     /*
      add a user record
    */
    insert: function (user, callback) {
      console.log("userDB.insert() ...")
      dbConn = db.getConnection()

      .then(dbConn => {
        var sql = 'INSERT INTO user (username, email, firstname, lastname, password) VALUES (?, ?, ?, ?,?)';

        dbConn.query(sql, [user.username, user.email, user.first, user.last, user.password], function (err, result) {
          dbConn.end()
            if (err) {
                console.log(err);
                return callback(err, null);
            } 
            else {
                console.log(JSON.stringify(result));
                console.log(result.affectedRows);
                return callback(null, result);
            }
          });
      })

    },

    /*
      return a set of all users
    */
    findByID: function (id, callback) {
        console.log("userDB.findByID() ...")
        dbConn = db.getConnection()
        .then(dbConn => {
          var sql = 'SELECT id, username, email, firstname, lastname, password FROM user WHERE id = ?'

          dbConn.query(sql, [id], function (err, result) {
            dbConn.end()
              if (err) {
                  console.log(err);
                  return callback(err, null);
              } 
              else {
                  if(result.length == 0){
                      return callback(null, null)
                  }
                  else{
                      return callback(null, result[0]);
                  }
                  
              }
          });
        })

    },

    /*
    return all user records
    */
    findAll: function (callback) {
        console.log("userDB.findAll() ...")
        dbConn = db.getConnection()
        .then(dbConn => {
          var sql = 'SELECT * FROM id'

          dbConn.query(sql, [], function (err, result) {
            dbConn.end()
              if (err) {
                  console.log(err);
                  return callback(err, null);
              } else {
                  return callback(null, result);
              }
          });
        })

    },



    /*
      update a user record
    */
    editUser: function (userID, user, callback) {
    console.log("userDB.edit() ...")
    dbConn = db.getConnection()
    .then(dbConn => {
      var sql = 'UPDATE user SET username=?, email=?, firstname=?, lastname=?, password=? WHERE id=?';
      
      dbConn.query(sql, [user.username, user.email, user.first, user.last, user.password, userID], function (err, result) {
          dbConn.end()
          if (err) {
              console.log(err);
              return callback(err, null);
          } 
          else {
              console.log(result.affectedRows);
  
              if(result.affectedRows == 0){
                return callback(null, null);
              }
              else{
                return callback(null, result.affectedRows);
              }
              
          }
      });
    })

    },

    /*
      delete a user record
    */
    delete: function (userID, callback) {
    console.log("userDB.delete() ...")
    dbConn = db.getConnection()

    .then(dbConn => {
      var sql = 'DELETE FROM user WHERE id=?';
      dbConn.query(sql, [userID], function (err, result){     
        dbConn.end()       
        if (err) {
            console.log(err);
            return callback(err, null);
        } 
        else {
            console.log(result.affectedRows);
            return callback(null, result.affectedRows);
        }
    });
    })  

    },


}

//-----------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------
module.exports = user
