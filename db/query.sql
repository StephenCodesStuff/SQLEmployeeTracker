SELECT department from department;

SELECT title, salary, department FROM role JOIN department on role. 
department_id = department.id;

SELECT first_name, last_name, manager_id, title
FROM employee
JOIN role ON employee.role_id = role.id;

SELECT employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, employee.id, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

INSERT INTO department (department) VALUES ("sales");

INSERT INTO role (title, salary, department_id) VALUES ("something", 100000, 1);

SELECT * FROM employee;

SELECT role.id, role.title FROM role;