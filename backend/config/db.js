const mysql = require("mysql-ssh")
const fs = require('fs')

var dbconnect = {
    getConnection:function(){
        var conn = mysql.connect(
            {
                host:'ec2-13-212-61-225.ap-southeast-1.compute.amazonaws.com',
                user:'ubuntu',
                privateKey: fs.readFileSync("/home/ubuntu/FYP-Web-Server/backend/config/FYP-KeyPair.pem")
            },
            {
            host:"ip-10-0-1-251.ap-southeast-1.compute.internal",
            port:"3306",
            user:"root",
            password: "password",
            database: "mouseslivedb",
            //Retain DATE as a string
            dateStrings:true,
            multipleStatements:true
        })
        return conn
    }
}

module.exports = dbconnect
