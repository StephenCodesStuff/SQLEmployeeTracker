
const { response } = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

// const viewAllDepartments() = require(/modules/viewalldpartments.js)
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

function start() {
  setTimeout(() => {
    inquirer
      .prompt({
        name: 'question',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]

      })
      .then((answers) => {
        switch (answers.question) {
          case 'View all departments':

            viewAllDepartments();

            break;

          case 'View all roles':
            viewAllRoles()
            break;

          case 'View all employees':
            viewAllEmployees()
            break;

          case 'Add a department':
            addADepartment()
            break;

          case 'Add a role':
            addARoll()
            break;

          case 'Add an employee':
            addAnEmployee()
            break;
          
          case 'Update an employee role':
            updateRole()
            break;

        }

        // Use user feedback for... whatever!!
      })

      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  }, 2000);
}


async function viewAllDepartments() {
  db.query('SELECT department FROM department;', function (err, results) {
    console.table(results);
  });
  start()

};

async function viewAllRoles() {
  db.query('SELECT title, salary, department FROM role JOIN department on role. department_id = department.id;', function (err, results) {
    console.table(results);
  });
  start()
};

async function viewAllEmployees() {
  db.query('SELECT employee.first_name, employee.last_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name, role.title, department.department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;', function (err, results) {
    console.table(results);
  });
  start()
};

async function addADepartment() {
  inquirer
    .prompt({
      name: 'newDepartment',
      type: 'input',
      message: 'What is your new department?',
    })
    .then((response) => {
      console.log(response.newDepartment)
      db.query(`INSERT INTO department (department) VALUES ("${response.newDepartment}");`, function (err, results) {
        console.log(`${response.newDepartment} added to departments`);
      });
    })
    .then((response) => {
      start()
    })
};

async function addARoll() {
  db.query('SELECT * FROM department;', function (err, departments) {
    if (err) {
      console.log(err);
      return;
    }
    const departmentChoices = departments.map((row) => ({
      name: row.department,
      value: row.id,
    }));

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'list',
          name: 'department',
          message: 'Enter the department for the role:',
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        console.log(response)
        const roleTitle = response.title;
        const roleSalary = response.salary;
        console.log(roleSalary);
        const departmentId = response.department;
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ?);`, [roleTitle, roleSalary, departmentId],
          function (err, response) {
            if (err) {
              console.error('error adding role' + err);
            } else {
              console.log(`Role '${roleTitle} added`)
            }
          })

        // db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.roleName}", ${response.salary}, ${response.department});`, function (err, response) {
        //   console.log(`${response.roleName} added to departments`);
        // });
      })
      .then((response) => {
        start()
      })
  })

};

async function addAnEmployee() {
  db.query('SELECT id, title FROM role;', function (err, role) {
    if (err) {
      console.log(err);
      return;
    }
    const roleChoice = role.map((row) => ({
      name: row.title,
      value: row.id,
    }));

db.query('SELECT first_name, last_name, id FROM employee;', function (err, data) {
  if (err) {
    console.log(err);
    return;
  }
  const managerChoice = data.map((row) => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id,
  }));

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the employee first name',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the employee last name',
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Enter the employee roll',
          choices: roleChoice,
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Enter their manager',
          choices: managerChoice
        },
      ])
      .then((response) => {
        const firstName = response.first_name;
        const lastName = response.last_name;
        const roleID = response.role_id;
        const managerID = response.manager_id
        console.log(firstName, lastName, roleID, managerID);
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerID});`, [`${firstName}`, `${lastName}`, roleID, managerID], 
        function (err, response) {
          console.log(`${firstName} added to departments`);
        });
      })
      .then((response) => {
        start()
      })
})

  })

};



async function updateRole() {
  db.query('SELECT id, title FROM role;', function (err, role) {
    if (err) {
      console.log(err);
      return;
    }
    const roleChoice = role.map((row) => ({
      name: row.title,
      value: row.id,
    }));

db.query('SELECT first_name, last_name, id FROM employee;', function (err, data) {
  if (err) {
    console.log(err);
    return;
  }
  const employeeChoice = data.map((row) => ({
    name: `${row.first_name} ${row.last_name}`,
    value: row.id,
  }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Enter the employee name',
          choices: employeeChoice,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Enter the employee roll',
          choices: roleChoice
        },
      ])
      .then((response) => {
        const roleID = response.role_id;
        const employeeID = response.id
        console.log(roleID, employeeID);
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [roleID, employeeID], 
        function (err, response) {
          console.log(`Employee role updated`);
        });
      })
      .then((response) => {
        start()
      })
})

  })

};

start()
