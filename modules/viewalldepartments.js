
function viewAllDepartments(){
    db.query('SELECT department FROM department;', function (err, results) {
      console.table(results);
    });
    inquirer
    .prompt({
    name: 'return',
    type: 'list',
    message: 'return to main menu?',
    choices: [
    'Yes',
    'no',
      ] });
  }; 


module.exports = viewAllDepartments()