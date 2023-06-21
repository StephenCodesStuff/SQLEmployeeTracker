SELECT department from department;

SELECT title, salery, department FROM role JOIN department on role. 
department_id = department.id;

SELECT first_name, last_name, manager_id, title
FROM employee
JOIN role ON employee.role_id = role.id;

SELECT employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, role.title, department.department, role.salery FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;

INSERT INTO department (department) VALUES ("sales");