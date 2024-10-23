//-----------------------------------------------------------------------
// load modules
//-----------------------------------------------------------------------
var db = require('../config/db.js');
var mysql = require('mysql')
//-----------------------------------------------------------------------
// functions
//-----------------------------------------------------------------------
var product = {
    getall : function (callback){
        const query = "SELECT * FROM products"
        dbConn = db.getConnection()
        .then(dbConn => {
            dbConn.query(query, (error,results) => {
                if (error){
                    return callback(error,null)
                }
                return callback(null,results)
            })
        })

    },
    getListing : function (productid, callback){
        const query = "SELECT * FROM products WHERE productid = ?"
        dbConn = db.getConnection()
        .then(dbConn => {
            dbConn.query(query, productid, (error,results) => {
                if (error){
                    return callback(error,null)
                }
                return callback(null,results)
            })
        })

    },
    getOrder: function (productid, userid, callback){
        const query = "SELECT * FROM products where productid = ?;SELECT * FROM user where id = ?"
        dbConn = db.getConnection()
        .then(dbConn => {
            dbConn.query(query, [productid,userid], (error,results) => {
                if (error){
                    return callback(error,null)
                }
                return callback(null,results)
            })
        })

    },
    newOrder:function(datapack,callback){
        const query = "INSERT INTO ORDERS (userid,productid) VALUES (?,?)"
        dbConn= db.getConnection()
        .then(dbConn => {
            dbConn.query(query, [datapack.userid,datapack.productid], function(err,result){
                dbConn.close()
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
    getFeatured:function(callback){
        const query = "SELECT * FROM products WHERE featured = 'fea'"
        dbConn= db.getConnection()
        .then(dbConn => {
            dbConn.query(query, function(err,result){
                dbConn.close()
                if (err) {
                    console.log(err);
                    return callback(err, null);
                } 
                else {
                    console.log(JSON.stringify(result));
                    console.log(result.affectedRows);
                    return callback(null, result);
                }
            })

        });
    },
}

//-----------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------
module.exports = product
