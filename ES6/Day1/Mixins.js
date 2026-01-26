class Student {
    constructor(name) {
        this.stdName = name
    }
    showStdName() {
        return `StudentName: ${this.stdName} `
    }
}


let x = {
    printName(name) {
        alert(name)
    }
}
Object.assign(Student.prototype, x)
var std = new Student("Ahmed")
console.log(std)
console.log(std.showStdName())

// printStdName('NAwal')
std.printName("Ali")

var std = {
    address: "Minia"
}

console.log(std.phoneNumber)





