// var str="Nawal Zaki"
// var str1=new String("Nawal Zaki")
// var data=new Date('')
// new Error()
// new Number()
// new Object()
// new Event()

// var stdID , stdName , stdAddress

// stdID=10
// stdName="Ahmed"
// stdAddress="Minia"

// var std={
//     "ID":10,
//     "name":'Ahmed',
//     "address":'Minia'
// }
// function showDataStudent(){
// console.log(std.name)
// console.log(std["name"])
// }

// showDataStudent()


// var str=new String()

// function Student(stdID, stdName) {
//     this.ID = stdID
//     this.Name = stdName
//     this.showDataStudent =function() {
//          return `StdID : ${this.ID} and StdName : ${this.Name}`
//     }
//     this.calDeg=function(stdDeg)
//     {
//         if(stdDeg<=100 && stdDeg>=85)
//         {
//             console.log("Ex.")
//         }
//         else if(stdDeg<85 && stdDeg>=75)
//         {
//             console.log("V.Good")
//         }
//         else{
//             console.log("Good")
//         }
//     }
// }

// var std = new Student(10, "Ali")
// var std1 = new Student(100, 'Ahmed')
// console.log(std.ID)
// console.log(std1.Name)
// console.log(std.Name)
// var std2 = new Student()
// std2.ID = 1000
// std2.Name = "Moahmmed"
// console.log(std2)

// var std3 = new Student()
// console.log(std3)


// var std=new Student(1,"Ali")
// var std1=new Student()
// std1.ID=2
// std1.Name="Mohammed"
// console.log(std.Name)
// console.log(std1)
// var data= std.showDataStudent()
// alert(data)
// std1.showDataStudent()
// std.calDeg(80)



// OOP ==> Encapsultion , Abstraction , Inhertance , Ploymirphism
function Shape(width , height)
{
    // variable Member
    // Public
    this.Width=width
    this.Height=height
     // Privare Member
    var color="blue"


    // Method Member
    this.setColor=function(Color)
    {
        if(Color=="red")
        {
            color="blue"
        }
        else{
            color=Color
        }
    }
    this.getColor=function()
    {
        return color
    }

    this.toString=function()
    {
        return `Width of This Shape is ${this.Width} and Height of This Shape is ${this.Height} and The Color ofThis Shape is ${color}`
    }
    this.drawShape=function()
    {
        var myShape=document.createElement('div')
        myShape.style.width=this.Width
        myShape.style.height=this.Height
        myShape.style.backgroundColor=color
        // var shape=document.getElementById('Shape')
        // shape.appendChild(myShape)
        return myShape
    }

}


// var sh1=new Shape(10,10)
// document.getElementById('Shape').appendChild(sh1.drawShape())
// document.body.appendChild(sh1.drawShape())

// var sh2=new Shape()
// sh2.Width=100
// sh2.Height=300
// document.body.appendChild(sh2.drawShape())
// // sh2.Color="green"
// // console.log(sh2.color)
// sh1.setColor("red")
// console.log(sh1.getColor())
// console.log(sh2.toString())


// Circle is a Shape
function Circle(radius=100)
{
    // this.radius=radius
    // this.radius|100
    this.Width=this.Height=radius

    this.drawShape=function()
    {
        var myCircle=document.createElement('div')
        myCircle.style.width=this.Width
        myCircle.style.height=this.Height
        myCircle.style.backgroundColor=this.getColor()
        myCircle.style.border="1px solid red"
        myCircle.style.borderRadius="50%"
        return myCircle
    }
}
Circle.prototype=new Shape()
// var c1=new Circle()
// console.log(c1)
// c1.Width=100
// console.log(c1)
// console.log(c1.toString())

// var c2=new Circle()

// console.log(c2)

// var c1 = new Circle(100)
// console.log(c1)
// console.log(c1.Width)
// console.log(c1.Height)

function Rect(w,h)
{
    this.Width=w
    this.Height=h
}
Rect.prototype=new Shape()
// var r1=new Rect(200,300)
// console.log(r1)

var shape=new Shape(100,400)
shape.setColor("yellow")
console.log(shape.toString())
document.body.appendChild(shape.drawShape())

var circle=new Circle(100)
circle.setColor("green")
console.log(circle.toString())
document.body.appendChild(circle.drawShape())


var rect=new Rect(500,700)
rect.setColor("blue")
console.log(rect.toString())
document.body.appendChild(rect.drawShape())

var c=new Circle()
console.log(c)




