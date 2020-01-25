/* =======================================================
    Welcome to my Employee Tracker Database!
        Based on node.js and uses mySQL to maintain
        the database.
======================================================== */

DROP DATABASE IF EXISTS employeeDatabase;

CREATE DATABASE employeeDatabase;

USE employeeDatabase;

CREATE TABLE department
(
    -- Department ID and name. --
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR
    (30) NOT NULL
);

    CREATE TABLE role
    (
        -- Employee roles, like Microbiologist, Manager... --
        id INT NOT NULL PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL (7, 2),
        -- Related to department ID in department table. --
        departmentId INT
    );

    CREATE TABLE employee
    (
        -- Specific employee information, role ID is related to id in role table. --
        id INT PRIMARY KEY,
        firstName VARCHAR(30),
        lastName VARCHAR(30),
        roleId INT,
        -- This id is referencing another employee's id; the manager of this particular employee. --
        managerId INT
    );

    /* =========================================================
    Hard coding information; the joins will add departmentId, roleId, and managerId. For now, I need to hard-code the data to test.
    ========================================================= */

    INSERT INTO department
        (deptName)
    VALUES
        ("Microbiology");

    INSERT INTO department
        (deptName)
    VALUES
        ("Chemistry");


    -- Adding role information. Last value relate to department table. --
    INSERT INTO role
        (title, salary, departmentId)
    VALUES("Microbiologist", 33296.53, 1);

    INSERT INTO role
        (title, salary, departmentId)
    VALUES("Chemist", 34596.02, 2);

    INSERT INTO role
        (title, salary, departmentId)
    VALUES("Manager", 5216.31, 1);

    -- Adding employee info. Last 2 values relate to role table. --
    INSERT INTO employee
        (firstName, lastName, roleId, managerId)
    VALUES("Crystal", "Ly", 1, 3);

    SELECT *
    FROM department;
    SELECT *
    FROM role;
    SELECT *
    FROM employee;