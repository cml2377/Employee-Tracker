var mysql = require("mysql");
require("dotenv").config();


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PASSWORD,
    database: "seed"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // After the connection, you must be able to go through any of the below functions before terminating the connection.
});

// Add function to create department
function createDept() {
    connection.query(``);
}
// Add function to create role

// Add function to create employee

// Add function to update role and employee

function updateRole() {
    connection.query(`UPDATE `)
    afterConnection();
}

function afterConnection() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        // Closes connection after the query has finished.
        connection.end();
    });
}