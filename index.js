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
                name: "username",
                choices: [
                    "View department list",
                    "View roles",
                    "View employee list",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update employee information",
                    "Remove employee from database",
                    "Exit"]
            },
        ])
        .then(function (response) {

            switch (response.username) {
                default:
                    text = "What did you do?! Now all of China knows you're here!";
                    break;
                case "View department list":
                    // Code
                    manageDB.viewDept();
                    break;
                case "View roles":
                    manageDB.viewRoles();
                    break;
                case "View employee list":
                    manageDB.viewEmployees();
                    break;
                case "Add a department":
                    manageDB.createDept();
                    break;
                case "Add a role":
                    manageDB.createRole();
                    break;
                case "Add an employee":
                    manageDB.createEmployee();
                    break;
                case "Update employee information":
                    manageDB.updateEmployee();
                    break;
                case "Remove employee from database":
                    manageDB.removeEmployee();
                    break;
                case "Exit":
                    console.log("Exiting employee database.")
                    setTimeout(console.log("Returning to the beginning..."), 2000);
                    manageDB.afterConnection();
                    break;
            }
        });
};

NSAEmployeeTracker();