-- DROP DATABASE IF EXISTS emp_trackerDB; 

-- CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;

-- CREATE TABLE department (
--   id INTEGER AUTO_INCREMENT,
--   dept_name VARCHAR(30),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE emp_role (
--   id INTEGER AUTO_INCREMENT,
--   title VARCHAR(30),
--   salary DECIMAL(6),
--   dept_id INTEGER,
--   PRIMARY KEY(id),
--   FOREIGN KEY (dept_id)
--   REFERENCES department (id));
--   
-- CREATE TABLE employee (
--   id INTEGER AUTO_INCREMENT,
--   first_name VARCHAR(30), 
--   last_name VARCHAR(30),
--   role_id INTEGER,
--   manager_id INTEGER, -- INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager 
--   primary key(id),
--   FOREIGN KEY (role_id) REFERENCES emp_role (id),
--   FOREIGN KEY (manager_id) REFERENCES employee(id));
--   

--  INSERT INTO emp_trackerDB.department (dept_name) VALUES ("Sales"),("Finance"),("Engineering"),("Legal");
--  INSERT INTO emp_trackerDB.emp_role (title, salary, dept_id) 
--  VALUES 
-- ("Sales Lead", 100000, 1),
-- ("Salesperson", 80000, 1),
-- ("Lead Engineer", 150000, 3),
-- ("Software Engineer", 120000, 3),
-- ("Accountant", 125000, 2),
-- ("Legal Team Lead", 250000, 4),
-- ("Lawyer", 190000, 4);


--  INSERT INTO emp_trackerDB.employee (first_name, last_name, role_id, manager_id)
--  VALUES ("Jon", "Gregory", 1, NULL), ("Mike", "Chan", 2, NULL), ("Ashley", "Rodriguez", 3, NULL), ("Kevin", "Tupik", 4, NULL),("Malia", "Brown", 5, NULL),("Sarah", "Lourde", 6, NULL),("Tom", "Allen", 7, NULL);

-- SELECT CONCAT(first_name, ' ', last_name) full_name FROM employee e LEFT JOIN department d on e.role_id = d.id
-- SELECT CONCAT(first_name, ' ', last_name) full_name FROM employee e 
-- FULL OUTER JOIN department d on e.role_id = d.dept_name WHERE d.dept_name = "Sales";

-- SELECT CONCAT(first_name, ' ', last_name) full_name, role_id FROM employee a JOIN emp_role b ON a.role_id = b.dept_id JOIN department c ON b.dept_id = c.id WHERE c.dept_name = "Sales";
-- SELECT CONCAT(first_name, ' ', last_name) full_name, role_id FROM employee a JOIN emp_role b ON a.role_id = b.dept_id JOIN department c ON b.dept_id = c.id WHERE c.dept_name = "Finance";
-- SELECT CONCAT(first_name, ' ', last_name) full_name, role_id FROM employee a JOIN emp_role b ON a.role_id = b.dept_id JOIN department c ON b.dept_id = c.id WHERE c.dept_name = "Engineering";
-- SELECT CONCAT(first_name, ' ', last_name) full_name, role_id FROM employee a JOIN emp_role b ON a.role_id = b.dept_id JOIN department c ON b.dept_id = c.id WHERE c.dept_name = "LegaL";
-- SELECT  FROM employee;
--   
-- SELECT * FROM department;
-- DELETE FROM employee, emp_role USING employee INNER JOIN emp_role
-- WHERE employee.id = emp_role.id

 
-- DELETE employee, emp_role FROM employee
-- INNER JOIN emp_role ON employee.id = emp_role.id
-- WHERE employee.id = 10;

-- SELECT id as role_id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name FROM employee a
-- JOIN emp_role b ON a.role_id = b.id
-- JOIN department c ON b.dept_id = c.id -- WHERE first_name = ${firstName} AND last_name = ${lastName}

-- SELECT * FROM emp_role;
-- SELECT role_id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name  FROM employee a
-- JOIN emp_role b ON a.role_id = b.id 

-- JOIN department c ON b.dept_id = c.id WHERE c.dept_name = "Engineering" 

-- UPDATE title set ? where ?

-- SELECT a.id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name FROM employee a
--     LEFT JOIN emp_role b ON a.id = b.id 
--      JOIN department c ON b.dept_id = c.id

SELECT emp_role.id, role_id, first_name, last_name, title, salary, dept_name FROM employee LEFT JOIN emp_role ON employee.role_id = emp_role.id LEFT JOIN department ON emp_role.dept_id = department.id WHERE first_name = "TJ" AND last_name = "Courey"

-- UPDATE emp_role LEFT JOIN employee ON employee.id = emp_role.id where title = "Salesperson" and employee.id = 
--  UPDATE employee

-- SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employee;

-- UPDATE b.title FROM employee a LEFT JOIN emp_role b ON a.id = b.id
-- WHERE title = "Salesperson"