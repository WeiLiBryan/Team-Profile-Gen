const Employee = require("./employee")

class Manager extends Employee {
    constructor(office){
        super(name, id, email)
        this.office = office;
    }
}

module.exports = Manager;