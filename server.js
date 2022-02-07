const mysql = require('mysql2');
const inquirer = require('inquirer');
const res = require('express/lib/response');
const teamMembers = [];

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

function init() {
    inquirer.prompt(questions)
        .then(answer => {
            if (answer === 'view all departments') {
                viewAllDepartments();
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




init();


