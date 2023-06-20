INSERT INTO department (id, name)
VALUES (1, "Finace"),
       (2, "Marketing"),
       (3, "Janitorial");
       

INSERT INTO role (id, title, salery, department_id)
VALUES (4, "Accountant", 100000, 1), (5, "sales person", 50000, 2), (6, "body remover", 200000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Rob", "Stem", 4, null), (8, "Tom", "Strap", 4, 7), (9, "John", "Coux", 5, null), (10, "Sara", "Grant", 5, 10), (11, "Joy", "Stem", 6, null), (12, "Amy", "Wong", 6, 11);
