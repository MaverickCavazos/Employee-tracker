INSERT INTO department (department_name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Lead Sales', 120000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 100000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 180000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Maverick', 'Cavazos', 4, 2),
('Lisa', 'Robertson', 2, 1);