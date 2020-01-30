//===================================================================
//   There are definitely better software options than this below. //
//===================================================================

var mysql = require("mysql");
require("dotenv").config();
// const consoleTable = require('console.table');
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PASSWORD,
    database: "employeeDatabase"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // After the connection, you must be able to go through any of the 
    // below functions before terminating the connection.
});

//======================================================================
//  Functions for SQL setting/updating/deleting based on user prompt  //
//======================================================================

// View department list
viewDept = (doneViewDeptCallback) => {
    console.log("Loading departments...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) {
            console.error(err);
        } else {
            // Log all results of the SELECT statement
            console.table(res);
        }
        doneViewDeptCallback();
    });
};

// View roles
viewRoles = (doneViewRolesCallback) => {
    console.log("Loading all roles...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) {
            console.error(err)
        } else {
            console.table(res);
        }
        doneViewRolesCallback();
    }
    )
};

// View employee list
viewEmployees = (doneViewEmployeeCallback) => {
    console.log("Loading all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.table(res);
        }
        doneViewEmployeeCallback();
    })
};

//===========================================================
// Add function to create department
//===========================================================
createDept = (doneCreateDeptCallback) => {
    console.log("Creating a new department...\n")
    inquirer.prompt([
        {
            name: "departmentName",
            type: "input",
            message: "What is the department name?"
        }
    ]).then(function (userInput) {
        connection.query("INSERT INTO department SET ?",
            {
                deptName: userInput.departmentName,
            },
            function (err) {
                if (err) throw err;
                // Don't need an else here because if there's an error, the 'throw' will break out of the function.
                console.log(`Department ${userInput.departmentName} was created successfully!`);
                // Displays table of departments.
                // This is NESTED SO MUCH
                viewDept(doneCreateDeptCallback);
            });
    })

};

// Add function to create role
createRole = (doneCreateRoleCallback) => {
    console.log("Creating a new role...")
    inquirer.prompt([
        {
            name: "roleTitle",
            type: "input",
            message: "What is the new role's Title?"
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "deptId",
            type: "list",
            message: "Which department does this role belong to?",
            choices: [
                // Select all from department.
                connection.query("SELECT * FROM department"), function (err) {
                    if (err) throw err;
                    // Do I need to parse the results out?
                    console.table(res);
                }
            ]
        }
    ]).then(function (userInput) {
        connection.query("INSERT INTO role SET ?",
            {
                title: userInput.roleTitle,
                salary: userInput.roleSalary,
                departmentId: userInput.deptId
            },
            function (err) {
                if (err) throw err;
                // Don't need an else here because if there's an error, the 'throw' will break out of the function.
                console.log(`Role ${userInput.roleTitle} was created successfully!`);
                // displays table of roles
                viewRoles(doneCreateRoleCallback);
            });
    })
};

// Add function to create employee
// I deserve this pain for doing callbacks. FML
createEmployee = (doneCreateEmployeeCallback) => {
    console.log("Creating new employee data...")
    connection.query("SELECT * FROM employee", function (err, res) {
        var managerArray = ["None"]; // This will return all employees... Technically all managers are employees.
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].firstName + " " + res[i].lastName);
        }
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "Which role does this employee belong to?"
            },
            {
                name: "managerList",
                type: "list",
                message: "Does this employee have a manager? If so, select their manager. If there is no manager, select None (NULL).",
                choices: managerArray
            }
        ]).then(function (userInput) {
            connection.query("INSERT INTO role SET ?",
                {
                    firstName: userInput.firstName,
                    lastName: userInput.lastName,
                    roleId: userInput.roleId,
                    // managerId: if true, an employeeId. if false, null.
                },
                function (err) {
                    // no throw, return error?
                    if (err) throw err;
                    // Don't need an else here because if there's an error, the 'throw' will break out of the function.
                    console.log(`${firstName} ${lastName}'s profile was created successfully!`);
                    // displays the table of employees.
                    viewEmployees(doneCreateEmployeeCallback);
                });
        })
    })
};

//===================================================
// Add function to update employee. WHAT THE EFFFF
//===================================================
function updateEmployee(doneUpdateEmployeeCallback) {
    // Must grab everything from employee table.
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
        // Use the response to populate choices in prompt.
        var nameArray = [];
        for (var i = 0; i < res.length; i++) {
            nameArray.push(res[i].firstName + " " + res[i].lastName);
        }

        inquirer.prompt(
            [
                { // Select an employee, then select by column what you want to change. 
                    name: "employeeList",
                    type: "list",
                    message: "Please select the employee you want to update.",
                    choices: nameArray
                },
                {
                    name: "employeeStats",
                    type: "list",
                    message: "Please select which parameter you'd like to update.",
                    choices: [
                        "role ID",
                        "manager"
                    ]
                },
                {
                    name: "employeeUpdateRole",
                    type: "input",
                    message: "Please update employee's role ID.",
                    when: (userInput) => userInput.employeeStats === "role"
                },
                {
                    name: "employeeUpdateManager",
                    type: "list",
                    message: "Please update employee's manager.",
                    choices: nameArray,
                    when: (userInput) => userInput.employeeStats === "manager"
                }

            ]).then((userInput) => {
                connection.query("UPDATE employee SET ? WHERE ?",
                    [
                        {
                            roleId: userInput.employeeUpdateRole
                        },
                        {
                            // id equals employee chosen in employeeList.
                        }
                    ], doneUpdateEmployeeCallback);
            })
    })


};

//======================================
// Add function to delete role
//======================================
removeRole = (doneRemoveRoleCallback) => {
    // Displays table of roles to reference when deleting roles.
    connection.query("SELECT * FROM role", function (err, res) {
        console.table(res);
    })
    return inquirer.prompt(
        {
            name: "removeRole",
            type: "input",
            message: "To remove a role from the database, please input the role ID.",
        })
        .then(function (res) {
            var newId = Number(res.removeRole);
            connection.query("DELETE FROM role WHERE ?", { id: newId }, function (err, res) {
                console.log("Role has been purged from the database.");
                // Displays table of roles.
                viewRoles(doneRemoveRoleCallback);
            });
        })
};


// Add function to delete employee
removeEmployee = (doneRemoveEmployeeCallback) => {
    // Provide a table of employees to reference when removing employees.
    connection.query("SELECT * FROM employee", function (err, res) {
        console.table(res);
    })
    return inquirer.prompt(
        {
            name: "removeEmployee",
            type: "input",
            message: "To remove an employee from the database, please input their employee ID.",

        })
        .then(function (res) {
            var newId = Number(res.removeEmployee);
            connection.query("DELETE FROM employee WHERE ?", { id: newId }, function (err, res) {
                console.log("Employee has been purged from the database.");
                // Displays table of employees.
                viewEmployees(doneRemoveEmployeeCallback);
            });
        })
};

//====================MAKE=IT=STOP=========================//
afterConnection = () => {
    // Closes connection after the query has finished.
    connection.end();
    return;
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
    "removeRole": removeRole,
    "removeEmployee": removeEmployee,
    "afterConnection": afterConnection
};