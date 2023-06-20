const inquirer = require('inquirer');
const mysql = require('mysql2');

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
           
            db.query('SELECT * FROM department', function (err, results) {
                console.log(results);
              });
        break;

        case 'View all roles':
            db.query('SELECT * FROM role', function (err, results) {
                console.log(results);
              });
        break;

        case 'View all employees':
            db.query('SELECT * FROM employee', function (err, results) {
                console.log(results);
              });

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

// import createConnection from 'mysql2';
// inquirer  
// .prompt({
//   name: 'action',
//   type: 'list',
//   message: 'What would you like to do?',
//   choices: [
//     'View all departments',
//     'View all roles',
//     'View all employees',
//     'Add a department',
//     'Add a role',
//     'Add an employee',
//     'Update an employee role',
//     'Exit'
//   ]
// })
