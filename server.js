
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

function start(){
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


function viewAllDepartments(){
  db.query('SELECT department FROM department;', function (err, results) {
    console.table(results);
  });
  start()
 
}; 

function viewAllRoles(){
  db.query('SELECT title, salery, department FROM role JOIN department on role. department_id = department.id;', function (err, results) {
    console.table(results);
  });
  start()
};

function viewAllEmployees(){
  db.query('SELECT employee.first_name, employee.last_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name, role.title, department.department, role.salery FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;', function (err, results) {
    console.table(results);
  });
  // start()
};

function addADepartment(){
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
  start()
};

function addARoll(){
  db.query('SELECT department FROM department;', function(err, departments) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(departments)

    inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the name of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:',
      },
      {
        type: 'input',
        name: 'department',
        message: 'Enter the department for the role:',
        // choices: departments.map(department => ({
        //   name: !
        // })),
      },
    ])
  })
};

start()

// CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manger_id