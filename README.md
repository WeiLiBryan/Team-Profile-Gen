# Team Profile Gen

----------------------

## Table of Contents

[Description](#Description) |
[Prerequisites](#Prerequisites) |
[Technologies](#Technologies-Used) |
[Video Walkthrough](#Video-Walkthrough) |
[Code Snippet](#Code-Snippet) |
[Authors](#Authors) |
[License](#License) |
[Acknowledgements](#Acknowledgements) |

## Description

Application will in take in info from terminal input and generate an HTML file that will contain the information given.

## Prerequisites

None

## Technologies Used

- Node
- Javascript

## Video Walkthrough

[Youtube Link](https://youtu.be/FE3puOtUL-s)

## Code Snippet

```Javascript
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
```

## Authors

1. **William W. Bryan**

- [Github](https://github.com/WeiLiBryan)
- [LinkedIn](https://www.linkedin.com/in/william-bryan-72730019a/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Acknowledgements

- [Stack Overflow](https://stackoverflow.com)
- [w3schools](https://w3schools.com)

### [Back to Table of Contents](#table-of-contents)