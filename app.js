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

const engineers = [];
const interns = [];

async function init() {
    console.log("Please build your team");
    // RETRIEVE INFO FOR MANAGER
    // const mVal = await managerInput();
    // const manager = new Manager(mVal.name, mVal.id, mVal.email, mVal.off);

    // ASK IF USER WOULD LIKE TO ADD A NEW MEMBER
    let choice = await askNewMember();
    
    while(choice.newMember !== 'No More'){
        console.log("Engineers: ", engineers);
        console.log("Interns: ", interns);
        switch (choice.newMember){
            case 'Engineer':
                const eVal = await engineerInput();
                const engineer = new Engineer(eVal.name, eVal.id, eVal.email, eVal.git);
                engineers.push(engineer);
                break;
            
            case 'Intern':
                const iVal = await internInput();
                const intern = new Intern(iVal.name, iVal.id, iVal.email, iVal.school);
                interns.push(intern);
                break;
        }

        choice = await askNewMember();
    }
}

function managerInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email?",
        },
        {
            type: "input",
            name: "off",
            message: "What is the team manager's office number?",
        },
    ]);
}

function askNewMember() {
    return inquirer.prompt([
        {
            type: "list",
            name: "newMember",
            message: "Which type of team member would you like to add?",
            choices: ['Engineer', 'Intern', 'No More'],
        }
    ]);
}

function engineerInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?",
        },
        {
            type: "input",
            name: "git",
            message: "What is the engineer's github?",
        },
    ]);
}

function internInput() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?",
        },
        {
            type: "input",
            name: "git",
            message: "What is the intern's school?",
        },
    ]);
}

init();