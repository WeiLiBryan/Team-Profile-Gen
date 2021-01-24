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
    const mVal = await managerInput();
    const manager = new Manager(mVal.name, mVal.id, mVal.email, mVal.off);

    // ASK IF USER WOULD LIKE TO ADD A NEW MEMBER
    let choice = await askNewMember();

    // WILL LOOP UNTIL NO MORE IS CHOSEN
    while(choice.newMember !== 'No More'){
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

    console.log("Creating Team...");

    // SENDS THE MANAGER OBJECT, ENGINEERS ARRAY AND INTERN ARRAY TO HTML GENERATOR
    // htmlGen(manager, engineers, interns);
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

const managerCard = (manager) => {
`<div class="card employee-card">
<div class="card-header">
    <h2 class="card-title">${manager.name}</h2>
    <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.role}</h3>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID: ${manager.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
        <li class="list-group-item">Office number: ${manager.officeNumber}</li>
    </ul>
</div>
</div>`
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

const engineerCard = (engineer) => {
`<div class="card employee-card">
<div class="card-header">
    <h2 class="card-title>${engineer.name}</h2>
    <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.role}</h3>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID: ${engineer.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
        <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.github}" target="_blank" rel="noopener noreferrer">${engineer.github}</a></li>
    </ul>
</div>
</div>`
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
            name: "school",
            message: "What is the intern's school?",
        },
    ]);
}

const internCard = (intern) => {
`<div class="card employee-card">
<div class="card-header">
    <h2 class="card-title">${intern.name}</h2>
    <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.role}</h3>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID: ${intern.id}</li>
        <li class="list-group-item">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
        <li class="list-group-item">School: ${intern.school}</li>
    </ul>
</div>
</div>`

}

// function htmlGen() {
//     fs.readFile('./assets/templates/engineer.html')
// }

init();