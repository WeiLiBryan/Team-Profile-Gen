const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// ARRAY FOR EMPLOYEES
const employees = [];

async function init() {
    console.log("Please build your team");
    // RETRIEVE INFO FOR MANAGER
    const mVal = await managerInput();
    const manager = new Manager(mVal.name, mVal.id, mVal.email, mVal.off);
    employees.push(manager);

    // ASK IF USER WOULD LIKE TO ADD A NEW MEMBER
    let choice = await askNewMember();

    // WILL LOOP UNTIL NO MORE IS CHOSEN
    while(choice.newMember !== 'No More'){
        switch (choice.newMember){
            // NEW ENGINEER IS CHOSEN
            case 'Engineer':
                const eVal = await engineerInput();
                let engineer = new Engineer(eVal.name, eVal.id, eVal.email, eVal.git);
                employees.push(engineer);
                break;
            
            // NEW INTERN IS CHOSEN
            case 'Intern':
                const iVal = await internInput();
                let intern = new Intern(iVal.name, iVal.id, iVal.email, iVal.school);
                employees.push(intern);
                break;
        }

        choice = await askNewMember();
    }

    const html = render(employees);

    fs.writeFile(outputPath, html, (err) => {
        if (err) throw err;
        else console.log('Saved in output folder');
    });
}

// INQUIRER PROMPTS FOR MANAGER
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

// BREAKS LOOP IF NO MORE IS CHOSEN
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

// INQUIRER PROMPTS FOR ENGINEER
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

// INQUIRER PROMPTS FOR INTERN
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

init();