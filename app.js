const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
async function init() {
    console.log("Please build your team");
    const manager = await managerInput();
    
}

async function managerInput() {
    await inquirer.prompt([
        {
            type: "input",
            name: "manName",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "manId",
            message: "What is the team manager's id?",
        },
        {
            type: "input",
            name: "manEmail",
            message: "What is the team manager's email?",
        },
        {
            type: "input",
            name: "manOff",
            message: "What is the team manager's office number?",
        },
    ])
    .then(val => {
        const manager = setManager(val);
        return manager;
    })
}

function setManager(manageDetails){
    const manager = new Manager(manageDetails.manName, manageDetails.manId, manageDetails.manEmail, manageDetails.manOff);
    console.log(manager);
    return manager;
}



init();