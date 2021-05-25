//const item = require("./lib/Item");
// const sequelize = require('./config/connection');
const inquirer = require("inquirer");
const cTable = require("console.table");
var deleteID;

const { restoreDefaultPrompts } = require("inquirer");
const mysql = require("mysql");
var id = 0;

const connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "pw",
  database: "emp_trackerDB",
});

function init() {
  console.log("_____________________________________________________");
  console.log("|    _____                 _                         |");
  console.log("|   | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |");
  console.log("|   |  _| | '_ ` _ \\| '_ \\| |/   \\| | | |/ _ \\/ _ \\  |");
  console.log("|   | |___| | | | | | |_) | | ( ) | |_| |  __/| __/  |");
  console.log("|   |_____|_| |_| |_| ,__/|_|\\___/|\\__, |\\___|\\___|  |");
  console.log("|                   | |             __| |            |");
  console.log("|                   |_|            |___/             |");
  console.log("|    __  __                                          |");
  console.log("|   |  \\/  | __ _ _ __   __ _  __ _  ___  _ __       |");
  console.log("|   | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\| '__|      |");
  console.log("|   | |  | | (_| | | | | ( | | (_| |  __/| |         |");
  console.log("|   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___||_|         |");
  console.log("|                              __| |                 |");
  console.log("|                             |___/                  |");
  console.log("|____________________________________________________|");

  mainMenuQuestion();
}

const mainMenuQuestion = () => {
  const mainMenuQuestionArr = [
    "View All Employees",
    "View All Employees By Department",
    "View All Employees By Manager",
    "Add employee",
    "Remove employee",
    "Update employee role",
    "Update employee dept",
  ];

  const mainMenuChoice = [
    {
      type: "list",
      message: "What would you like to do:",
      name: "mainMenuQuestion",
      choices: mainMenuQuestionArr,
    },
  ];
  inquirer
    .prompt(mainMenuChoice)
    .then((answers) => {
      switch (answers.mainMenuQuestion) {
        case "View All Employees": {
          viewAllEmployees();
          break;
        }
        case "View All Employees By Department": {
          viewAllByDept();
          break;
        }
        case "View All Employees By Manager": {
          viewAllByManager();
          break;
        }
        case "Add employee": {
          addEmployee();
          break;
        }
        case "Remove employee": {
          deleteEmployee();
          break;
        }
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

const viewAllEmployees = () => {
  connection.query(
    `SELECT a.id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name FROM employee a
    JOIN emp_role b ON a.role_id = b.id 
    JOIN department c ON b.dept_id = c.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      connection.end;
      mainMenuQuestion();
    }
  );
};

const deptCatagoryArr = ["Sales", "Finance", "Engineering", "Legal"];
const titleChoiceArr = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Accountant",
  "Legal Team Lead",
  "Lawyer",
];

const addEmpArr = [
  {
    type: "input",
    name: "firstName",
    message: "Enter the employee first name",
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter the employee last name",
  },
  {
    type: "rawlist",
    name: "employeeTitle",
    message: "Enter the employee title",
    choices: titleChoiceArr,
  },
  {
    type: "input",
    name: "employeeSalary",
    message: "Enter the employee salary",
  },
  {
    type: "rawlist",
    name: "departmentName",
    message: "Enter the employee department name",
    choices: deptCatagoryArr,
  },
];

const addEmployee = () => {
  inquirer
    .prompt(addEmpArr)
    .then((answers) => {
      console.table(answers);
      let title = answers.employeeTitle;
      let salary = answers.employeeSalary;
      let firstName = answers.firstName;
      let lastName = answers.lastName;

      switch (answers.employeeTitle) {
        case "Sales Lead": {
          updateTitle(title, salary, 1);
          updateEmployee(firstName, lastName, 1);
          return mainMenuQuestion();
        }
        case "Salesperson": {
          updateTitle(title, salary, 1);
          updateEmployee(firstName, lastName, 2);
          return mainMenuQuestion();
        }
        case "Lead Engineer": {
          updateTitle(title, salary, 3);
          updateEmployee(firstName, lastName, 3);
          return mainMenuQuestion();
        }
        case "Software Engineer": {
          updateTitle(title, salary, 3);
          updateEmployee(firstName, lastName, 4);
          return mainMenuQuestion();
        }
        case "Accountant": {
          updateTitle(title, salary, 2);
          updateEmployee(firstName, lastName, 5);
          return mainMenuQuestion();
        }
        case "Legal Team Lead": {
          updateTitle(title, salary, 4);
          updateEmployee(firstName, lastName, 6);
          return mainMenuQuestion();
        }
        case "Lawyer": {
          updateTitle(title, salary, 4);
          updateEmployee(firstName, lastName, 7);
          return mainMenuQuestion();
        }
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

function multiFunction(cb1, cb2) {
  cb1();
  cb2();
}

const updateEmployee = (firstName, lastName, roleId) => {
  connection.query(
    `INSERT INTO emp_trackerDB.employee (first_name, last_name, role_id, manager_id) VALUES ( ? , ? , ? , ? )`,
    [firstName, lastName, roleId, null],
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

const updateDept = (deptName) => {
  connection.query(
    `INSERT INTO emp_trackerDB.department (dept_name) SET ?`,
    { dept_name: deptName },
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

const updateTitle = (title, salary, deptId) => {
  connection.query(
    `INSERT INTO emp_trackerDB.emp_role (title, salary, dept_id) VALUES ( ? , ? , ? )`,
    [title, salary, deptId],
    (err, res) => {
      if (err) throw err;
      connection.end;
    }
  );
};

const viewAllByDept = () => {
  connection
    .query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      inquirer
        .prompt({
          name: "deptChoice",
          type: "rawlist",
          choices() {
            const deptArray = [];
            res.forEach(({ dept_name }) => {
              deptArray.push(dept_name);
            });
            return deptArray;
          },
          message: "What dept would you like to view an employee list of?",
        })
        .then((answer) => {
          let dept = answer.deptChoice;
          // get the employee list of the chosen dept
          connection.query(
            `SELECT role_id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name FROM employee a
            JOIN emp_role b ON a.role_id = b.id 
            JOIN department c ON b.dept_id = c.id WHERE c.dept_name = "${dept}";`,
            (err, res) => {
              if (err) throw err;
              console.table(res);
              connection.end;
              mainMenuQuestion();
            }
          );
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

const deleteEmployee = () => {
  const empArray = [];

  connection
    .query(
      `SELECT a.id, role_id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name FROM employee a
    JOIN emp_role b ON a.role_id = b.id
    JOIN department c ON b.dept_id = c.id`,
      (err, res) => {
        if (err) throw err;
        const result = Object.values(JSON.parse(JSON.stringify(res)));
        result.forEach((val) => empArray.push(val.full_name));
        inquirer
          .prompt({
            name: "empChoice",
            type: "rawlist",
            choices: empArray,
            message: "Which employee would you like to delete?",
          })
          .then((answer) => {
            let wordsArr = answer.empChoice.split(" ");
            let firstName = wordsArr[0];
            let lastName = wordsArr[1];
            connection.query(
              `SELECT a.id, first_name, last_name, title, salary, dept_name FROM employee a JOIN emp_role b ON a.role_id = b.id JOIN department c ON b.dept_id = c.id WHERE first_name = "${firstName}" AND last_name = "${lastName}"`,

              (err, res) => {
                if (err) throw err;
                const newRes = Object.values(JSON.parse(JSON.stringify(res)));
                newRes.forEach(({ id }) => {
                  deleteID = id;
                  return deleteID;
                });
                deleteRecord(deleteID);
              }
            );
          });
      }
    )
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

const deleteRecord = (deleteID) => {
  let empId = deleteID;
  connection.query(
    `DELETE employee, emp_role FROM employee INNER JOIN emp_role ON employee.id = emp_role.id WHERE employee.id = ${empId}`,
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} employees deleted!\n`);
      // Call readProducts AFTER the DELETE completes
      mainMenuQuestion();
    }
  );
};

init();
