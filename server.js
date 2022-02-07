const mysql = require('mysql2');
const inquirer = require('inquirer');


const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '1nnd90MR$!',
        database: 'employees'
    },
    console.log('Connected to the employee database.')
);


const questions = [
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'and update an employee role'],
    },
];

const deptQuestions = [
    {
        type: 'input',
        name: 'dept',
        message: 'What department would you like to add?'
    }
];

const roleQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role you would like to add?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of that role?'
    },
    {
        type: 'input',
        name: 'deptid',
        message: 'What is the department id does it belong too?(hint: sales = 1, engineering = 2, finance = 3, legal = 4)'
    }
];

const employeeQuestions = [
    {
        type: 'input',
        name: 'first',
        message: 'What is the first name of the employee you would like to add?'
    },
    {
        type: 'input',
        name: 'last',
        message: 'What is the employees last name?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'What role does the employee have?',
        choices: ['Lead Sales', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
    },
    {
        type: 'input',
        name: 'manager',
        message: 'What is their managers id?(hint: dont know the managers id? Go to view all employees in the menu options to find out.'
    }
];

const update = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to update?',
        choices: ['first name', 'last name', 'role id', 'manager id']
    }
]


function init() {
    inquirer.prompt(questions)
        .then(answer => {
            if (answer.start === 'view all departments') {
                viewAllDepartments();
            } else if (answer.start === 'view all roles') {
                viewAllRoles();
            } else if (answer.start === 'view all employees') {
                viewAllEmployees();
            } else if (answer.start === 'add a department') {
                addADepartment();
            } else if (answer.start === 'add a role') {
                addARole();
            } else if (answer.start === 'add an employee') {
                addAnEmployee();
            } else if (answer.start === 'and update an employee role') {
                updateEmployee();
            }
        })
};




function viewAllDepartments() {
    const sql = `SELECT department.name AS department FROM department`;
    db.query(sql, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.log('\n');
        console.table(res);
    })
};

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('\n');
        console.log('VIEW ALL ROLES');
        console.log('\n');
        console.table(res);
    })
};

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
    })
};

function addADepartment() {
    inquirer.prompt(deptQuestions).then(answers => {
        const sql = `INSERT INTO department(name) VALUES("${answers.dept}")`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('ADD A DEPARTMENT');
            console.log('\n');
            console.table(res);
        })
    })
};

function addARole() {
    inquirer.prompt(roleQuestions).then(answers => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", "${answers.salary}", "${answers.deptid}")`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('ADD A ROLE');
            console.log('\n');
            console.table(res);
        })
    })
};

function addAnEmployee() {
    inquirer.prompt(employeeQuestions).then(answers => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.first}", "${answers.last}", "${answers.role}", "${answers.manager}")`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('ADD A EMPLOYEE');
            console.log('\n');
            console.table(res);
        })
    })
};


function updateEmployee() {
    inquirer.prompt(update)
        .then(answer => {
            if (answer.choice === 'first name') {
                updateFirst();
            } else if (answer.choice === 'last name') {
                updateLast();
            } else if (answer.choice === 'role id') {
                updateRoleId();
            } else if (answer.choice === 'manager id') {
                updateManagerId();
            } 
        })
    };

const firstName = [
    {
        type: 'input',
        name: 'pickid',
        message: 'What is the id of the employee you want to update?(hint: dont know id? Go to the menu and select view all employees and find the employee and id you want to change!'
    },
    {
        type: 'input',
        name: 'firstname',
        message: 'What would you like to update the employees first name too?'
    }
]

const lastName = [
    {
        type: 'input',
        name: 'pickid',
        message: 'What is the id of the employee you want to update?(hint: dont know id? Go to the menu and select view all employees and find the employee and id you want to change!'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'What would you like to update the employees last name too?'
    }
]

const roleIdQuestions = [
    {
        type: 'input',
        name: 'pickid',
        message: 'What is the id of the employee you want to update?(hint: dont know id? Go to the menu and select view all employees and find the employee and id you want to change!'
    },
    {
        type: 'list',
        name: 'roleids',
        message: 'What would you like to update the employees role ID too?',
        choices: ['1: Lead Sales', '2: Salesperson', '3: Lead Engineer', '4: Software Engineer', '5: Account Manager', '6: Accountant', '7: Legal Team Lead', '8: Lawyer']
    }
]

const managerIdQuestions = [
    {
        type: 'input',
        name: 'pickid',
        message: 'What is the id of the employee you want to update?(hint: dont know id? Go to the menu and select view all employees and find the employee and id you want to change!'
    },
    {
        type: 'input',
        name: 'managerids',
        message: 'What would you like to update the employees manager ID too?',
    }
]

function updateFirst() {
    inquirer.prompt(firstName)
    .then(answer => {
        const sql = `UPDATE employee SET first_name = "${answer.firstname}" WHERE id = "${answer.pickid}"`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('UPDATE EMPLOYEE FIRST NAME');
            console.log('\n');
            console.table(res);
        })
    })
};

function updateLast() {
    inquirer.prompt(lastName)
    .then(answer => {
        const sql = `UPDATE employee SET last_name = "${answer.lastname}" WHERE id = "${answer.pickid}"`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('UPDATE EMPLOYEE LAST NAME');
            console.log('\n');
            console.table(res);
        })
    })
};

function updateRoleId() {
    inquirer.prompt(roleIdQuestions)
    .then(answer => {
        const sql = `UPDATE employee SET role_id = "${answer.roleids}" WHERE id = "${answer.pickid}"`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('UPDATE EMPLOYEE ROLE ID');
            console.log('\n');
            console.table(res);
        })
    })
};

function updateManagerId() {
    inquirer.prompt(managerIdQuestions)
    .then(answer => {
        const sql = `UPDATE employee SET manager_id = "${answer.managerids}" WHERE id = "${answer.pickid}"`;
        db.query(sql, (err, res) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log('\n');
            console.log('UPDATE EMPLOYEE MANAGER ID');
            console.log('\n');
            console.table(res);
        })
    })
};
        





init();


