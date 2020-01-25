DROP DATABASE IF EXISTS employeeDatabase;

CREATE DATABASE employeeDatabase;

USE employeeDatabase;

CREATE TABLE department
(
    --Department ID and name.--
    id INT NOT NULL
    AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR
    (30) NOT NULL
);

    CREATE TABLE role
    (
        --Employee roles, like Microbiologist I, Chemist II--
        id INT NOT NULL PRIMARY KEY,
        title VARCHAR(30),
        salary DECIMAL (7, 2),
        departmentId INT
    );

    CREATE TABLE employee
    (
        --Specific employee information, role ID is related to id in role table--
        id INT PRIMARY KEY,
        firstName VARCHAR(30),
        lastName VARCHAR(30),
        roleID INT,
        --This id is referencing another employee's id; the manager of this particular employee--
        managerId INT
    );

    SELECT *
    FROM department;
    SELECT *
    FROM role;
    SELECT *
    FROM employee;

    