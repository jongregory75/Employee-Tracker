//const item = require("./lib/Item");
const mainMenuInquirer = require("inquirer");
const inquirer = require("inquirer");

const viewAllEmployeesInq = require("inquirer");
const viewAllByDeptInq = require("inquirer");
const viewAllByManagerInq = require("inquirer");

const inquireAddItem = require("inquirer");
const addNewItem = require("inquirer");
const inquireInt = require("inquirer");
const inquireAddNewItem = require("inquirer");
const { restoreDefaultPrompts } = require("inquirer");
const mysql = require("mysql");
var itemBid = 0;
var id = 0;
var itemObj = [];

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
      console.log("Inside switch");
      console.log(answers);
      switch (answers.mainMenuQuestion) {
        case "View All Employees": {
          console.log("View All Employees");
          viewAllEmployees();
          break;
        }
        case "View All Employees By Department": {
          console.log("View All Employees By Dept");
          viewAllByDept();
          break;
        }
        case "View All Employees By Manager": {
          console.log("View All Employees By Manager");
          viewAllByManager();
          break;
        }
        case "Add employee": {
          console.log("Add employee");
          addEmployee();
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
  console.log("--Selecting all employees--");
  connection.query(
    `SELECT role_id, CONCAT(first_name, ' ', last_name) full_name, title, salary, dept_name FROM employee a
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
  console.log("--Add Employee Function--");
  inquirer
    .prompt(addEmpArr)
    .then((answers) => {
      console.table(answers);
      let deptName = answers.departmentName;
      let title = answers.employeeTitle;
      let salary = answers.salary;
      let firstName = answers.firstName;
      let lastName = answers.lastName;

      switch (answers.employeeTitle) {
        case "Sales Lead": {
          console.log("Case Sales Lead");
          updateDept(deptName);
          updateTitle(title, salary, 1);
          updateEmployee(firstName, lastName, 1);
          break;
        }
        case "Salesperson": {
          console.log("Case Salesperson");
          let deptName = "Sales";
          updateDept(deptName);
          updateTitle(title, salary, 1);
          updateEmployee(firstName, lastName, 2);
          break;
        }
        case "Lead Engineer": {
          console.log("Case Engineer");
          updateDept(deptName);
          updateTitle(title, salary, 3);
          updateEmployee(firstName, lastName, 3);
          break;
        }
        case "Software Engineer": {
          console.log("Case Software Engineer");
          updateDept(deptName);
          updateTitle(title, salary, 3);
          updateEmployee(firstName, lastName, 4);
          break;
        }
        case "Accountant": {
          console.log("Case Accountant");
          updateDept(deptName);
          updateTitle(title, salary, 2);
          updateEmployee(firstName, lastName, 5);
          break;
        }
        case "Legal Team Lead": {
          console.log("Case Legal Team Lead");
          updateDept(deptName);
          updateTitle(title, salary, 4);
          updateEmployee(firstName, lastName, 6);
          break;
        }
        case "Lawyer": {
          console.log("Case Lawyer");
          updateDept(deptName);
          updateTitle(title, salary, 4);
          updateEmployee(firstName, lastName, 7);
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

updateEmployee = (firstName, lastName, roleId) => {
  connection.query(
    `INSERT INTO emp_trackerDB.employee (first_name, last_name, role_id, manager_id) SET ?`,
    `VALUES ("${firstName}", "${lastName}", "${roleId}", "NULL")`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      connection.end;
    }
  );
};

updateDept = (deptName) => {
  connection.query(
    `INSERT INTO emp_trackerDB.department (dept_name) SET ?`,
    `VALUES ("${deptName}")`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      connection.end;
    }
  );
};

updateTitle = (title, salary, deptId) => {
  connection.query(
    `INSERT INTO emp_trackerDB.emp_role (title, salary, dept_id) SET ?`,
    `VALUES ("${title}", "${salary}", "${deptId}", "NULL")`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      connection.end;
    }
  );
};

const viewAllByDept = () => {
  connection
    .query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      console.log("--Selecting depts into array--");
      console.table(res);

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
          console.log("Inside dept select answer");
          console.table(answer);
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

// const deleteItem = () => {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry",
//     },
//     (err, res) => {
//       if (err) throw err;
//       console.log(`${res.affectedRows} products deleted!\n`);
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// };

init();
