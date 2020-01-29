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

//======================================================================
//  Functions for SQL setting/updating/deleting based on user prompt  //
//======================================================================

// View department list
function viewDept() {
    console.log("Loading departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // return back to the prompt.

    });
};

// View roles
function viewRoles() {
    console.log("Loading all roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // return back to prompt.
    }
    )
};

// View employee list
function viewEmployees() {
    console.log("Loading all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        // return back to prompt
    })
};

// Add function to create department
function createDept() {
    connection.query(``);
};
// Add function to create role
function createRole() {

};
// Add function to create employee
function createEmployee() {

};
// Add function to update employee
function updateEmployee() {

};
// Add function to delete employee
function removeEmployee() {

};


function afterConnection() {
    // Closes connection after the query has finished.
    connection.end();
}

/*==========================================================================
             This creates an object that gets exported.
    It is a way to expose the functions in this file to the outside world
==========================================================================*/
module.exports = {
    "viewDept": viewDept,
    "viewRoles": viewRoles,
    "viewEmployees": viewEmployees,
    "createDept": createDept,
    "createRole": createRole,
    "createEmployee": createEmployee,
    "updateEmployee": updateEmployee,
    "removeEmployee": removeEmployee,
    "afterConnection": afterConnection
};