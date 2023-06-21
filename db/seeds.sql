INSERT INTO department (department)
VALUES ("Finace"),
       ("Marketing"),
       ("Janitorial");
       

INSERT INTO role (title, salery, department_id)
VALUES ("Accountant", 100000, 1), ("sales person", 50000, 2), ("body remover", 200000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Rob", "Stem", 1, null), 
("Tom", "Strap", 1, 1), 
("John", "Coux", 2, null), 
("Sara", "Grant",2, 3), 
("Joy", "Stem", 3, null), 
("Amy", "Wong", 3, 5);
