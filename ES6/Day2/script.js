// FILO  --> First In Last Out , LOFI --> Last In First Out

// console.log("Hello");
// console.log("Weclome");
// console.log("to");
// console.log("JavaScript");
// console.log("Programming");

// function first()
// {
//     console.log("First")
// }
// function second()
// {
//     console.log("Second")
//     first()
// }
// function third()
// {
//     console.log("Third")
//     second()
// }

// third()



// console.log("Start")   
// setTimeout(()=>{
//     console.log("IN SetTimeout")
// },10000)
// console.log("End")


// var btn=document.getElementById("myButton")
// btn.addEventListener("click",showMSG)

// function showMSG()
// {
//     alert("Welcome")
// }

// function test(fun)
// {
//    return fun
// }

// function myFunction()
// {
//     console.log("Function as a parameter")
// }

// test(myFunction)()


// setTimeout(()=>{
//     setTimeout(()=>{
//         setTimeout(()=>{
//             console.log("Hello from 3rd level")
//         },4000)
//     },3000)
// },2000)



// console.log(1)
// console.log(2)
// console.log(3)


// fetch('https://dummyjson.com/products')
// .then(e => e.json())
// .then(console.log);


// var xml=new XMLHttpRequest()
// xml.open("GET",'https://dummyjson.com/products',true)
// xml.send()   



// apply call bind 


// var arrNumbers=[1,2,3,4,5]
// console.log(Math.max.apply(this,arrNumbers))  // 5


// function fun()
// {
//     console.log("welcome")
// }

// fun.call()


// function Student(name,age,email)
// {
//     this.name=name
//     this.age=age
//     this.email=email
// }

// Student.prototype.showDetails=function()
// {
//     console.log("Name :"+this.name)
//     console.log("Age :"+this.age)
//     console.log("Email :"+this.email)
// }

// var std=new Student("Ahmed",22,"Ahmed@email")
// std.showDetails()


// var std1=new Student("Ahmed1",22,"Ahmed1@email")
// std1.showDetails()


class Student{
    static collegeName="ABC College"    
    constructor(name,age,email){
        this.name=name
        this.age=age
        this.email=email
    }
    static fun(){
        console.log("Static Method")
    }
}

var Student1=new Student("Nawal",21,"nawal@email")
console.log(Student.collegeName)
Student.fun()

console.log(Student1)