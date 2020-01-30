/*==========================================================================
        Welcome to NSA's employee tracker! Just kidding.
==========================================================================*/

// No really.
function NSAEmployeeTracker() {

    // This file prompts the user to add/delete/update employees/departments
    // from the sql database.
    const inquirer = require("inquirer");
    const manageDB = require("manageDB");

    inquirer
        .prompt([
            {
                type: "list",
                message: "Welcome to the Employee Database.",
                name: "mainMenu",
                choices: [
                    "View department list",
                    "View roles",
                    "View employee list",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update employee information",
                    "Remove a role from database",
                    "Remove employee from database",
                    "Exit"]
            },
        ])
        .then(function (response) {

            switch (response.mainMenu) {
                default:
                    text = "What did you do?! Now all of China knows you're here!";
                    break;
                //======================================================
                case "View department list":
                    // Code. Make a PROMISE, so I can restart the inquirer questions AFTER view/update/createDept/Role/Employee is done.
                    manageDB.viewDept().then(function () {
                        //restart questions
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "View roles":
                    manageDB.viewRoles().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "View employee list":
                    manageDB.viewEmployees().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Add a department":
                    manageDB.createDept().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Add a role":
                    manageDB.createRole().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Add an employee":
                    manageDB.createEmployee().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Update employee information":
                    manageDB.updateEmployee().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Remove a role from database":
                    manageDB.removeRole().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Remove employee from database":
                    manageDB.removeEmployee().then(function () {
                        NSAEmployeeTracker();
                    });
                    break;
                //======================================================
                case "Exit":
                    console.log("Exiting employee database.")
                    setTimeout(console.log("Returning to the beginning..."), 2000);
                    manageDB.afterConnection();
                    break;
            }
        });
};

NSAEmployeeTracker();