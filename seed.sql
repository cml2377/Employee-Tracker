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
        salary DECIMAL (10, 2),
        -- Related to department ID in department table. A foreign key! --
        departmentId INT,
        FOREIGN KEY (departmentId)
        REFERENCES department(id)
        -- On delete cascade will delete the department all the way down (cascading) the tables that reference that specific dept id. --
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    );

    CREATE TABLE employee
    (
        id INT PRIMARY KEY,
        firstName VARCHAR(30),
        lastName VARCHAR(30),

        --Foreign keys below--
        roleId INT,
        FOREIGN KEY (roleId)
        REFERENCES role(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,

        -- This id is referencing another employee's id; the manager of this particular employee. --
        managerId INT,
        FOREIGN KEY (managerId)
        REFERENCES employee(id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
    );

    /* ==================================================================================================================================
    Hard coding information; the joins will add departmentId, roleId, and managerId. For now, I need to hard-code the data to test.
    ================================================================================================================================== */

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
        (firstName, lastName)
    VALUES("Crystal", "Ly");

    INSERT INTO employee
        (firstName, lastName, roleId, managerId)
    VALUES("Anthony", "Garza");

    /*================================================================*/

    SELECT employeeDatabase.employee.firstName, employeeDatabase.employee.firstName
    FROM employeeDatabase.employee INNER JOIN employeeDatabase.role on
    ;


    SELECT *
    FROM employee
    WHERE title="Microbiologist"
    DESC LIMIT 1;
