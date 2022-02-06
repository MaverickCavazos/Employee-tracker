const express = require('express');
const mysql = require('mysql2');
var inquirer = require('inquirer');
const res = require('express/lib/response');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '1nnd90MR$!',
        database: 'election'
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



const afterChoice = () => {
    if (answers.choices === 'view all departments') {
        const departments = `SELECT * FROM departments`;
        db.query(departments, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            })
        })
    } else if (answers.choics === 'view all roles') {
        const roles = `SELECT * FROM roles`;
        db.query(roles, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            })
        })
    } else if (answers.choics === 'view all employees') {
        const roles = `SELECT * FROM employees`;
        db.query(roles, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            })
        })
    } else if (answers.choics === 'add a department') {
        const { department } = inquirer.prompt([
            {
                name: "add department",
                type: "input",
                message: "Enter the department name you want to add: "
            }
        ]);
        const roles = `INSERT INTO departments (department_name) VALUES (${department.answers})`;
        db.query(roles, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            })
        })
    } else if (answers.choics === 'add a role') {
        const { role } = inquirer.prompt([
            {
                name: "add title",
                type: "input",
                message: "Enter the role name you want to add: "
            }
        ]);
        const { salary } = inquirer.prompt([
            {
                name: "add salary",
                type: "input",
                message: "Enter the salary of the role you want to add: "
            },
        ]);
        const { roleDepartment } = inquirer.prompt([
            {
                name: "add department",
                type: "list",
                message: "Pick which department this role belongs too",
                choices: ['Sales', 'Engineering', 'Finance', 'Legal']
            }
        ]);

        const roles = `INSERT INTO roles (title, salary, department_id) VALUES (${role.answers}, ${salary.answers}, ${roleDepartment.answers})`;
        db.query(roles, (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: rows
            })
        })
    } /* else if (answers.choics === 'add an employee') {
    const employee = await inquirer.prompt([
        {
            name: "add employee",
            type: "input",
            message: "Enter the employee name you want to add: "
        }, 
        {
            name: "add employee",
            type: "input",
            message: "Enter the employee name you want to add: "
        }
      ]);
    
    const roles = `INSERT INTO departments (department_name) VALUES (${department.answers})`;
    db.query(roles, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
} else if (answers.choics === 'and update an employee role') {
    const roles = `SELECT * FROM roles`;
    db.query(roles, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
} */ else {
        res.status(404).end();
    }
};

function init() {
    inquirer.prompt(questions)
    .then((answers) => {
        optionMenu(answers)
    })
    .catch((error) => {
        if (error.isTtyError) {

        } else {
            // Something else went wrong
        }
    })
};

function optionMenu() {
    inquirer.prompt()
        .then((answers) => {
            afterChoice(answers)
        })
        .catch((error) => {
            if (error.isTtyError) {

            } else {
                // Something else went wrong
            }
        })
};



init();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
