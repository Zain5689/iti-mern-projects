import {add} from './index.js'

// Generator Function
// function* count() {
//     for (var i = 1; i < 4; i++) {
//         yield i
//     }
// }

// var genFun = count()
// console.log(genFun)
// console.log(genFun.next().value)
// console.log(genFun.next().done)
// console.log(genFun.next())
// console.log(genFun.next())

// function showData() {
//     if (i==0) {
//         return `Welcome`
//     }
//     else {
//         return  `Hello`
//     }
// }


// Promise ===> CallBack Hell

// setTimeout(()=>{
//     console.log("Welcome")
//     setTimeout((

//     )=>{},3000)
// },2000)

// var proFun= new Promise((resolve,reject)=>{
//     resolve("Hello from Promise")
//     reject("Rejected")
// })

// console.log(proFun)

// proFun.then((res)=>{document.write(res)})


// var mypro=new Promise((resolve,reject)=>{
//     var number=5
//     if(number==6)
//     {
//         resolve("Number is 6")
//     }
//     else
//     {
//         reject("Number is not 6")
//     }
// })

// mypro.then((msg)=>{console.log(msg)}).catch((err)=>{console.log(err)})


// function show(callback)
// {
//     return callback()
// }

// function showName()
// {
//     return `Nawal`
// }
// show()
// show(()=>{console.log("Welcome in my Function")})



// function getProducts() {
//     debugger
//     return new Promise((resolve, reject) => {
//         var httpRequest = new XMLHttpRequest()
//         httpRequest.open("get", "https://fkestoreapi.com/products", true)
//         httpRequest.send()
//         httpRequest.onreadystatechange = function () {
//             if (this.status == 200 && this.readyState == 4) {
//                 // debugger;
//                 var data = JSON.parse(this.responseText)
//                 resolve(data)
//             }
//             else if(this.readyState == 4)
//             {
//                 reject("Problem With Server")
//             }
//         }
//     })


// }
// console.log(getProducts())
// var products=getProducts()

// var products=getProducts()
// products.then((d)=>{console.log(d)}).catch((er)=>{console.log(er)})

// async function get() {
//     var res = await getProducts()
//     res.then((pro) => { console.log(pro) }).catch((err) => { console.log(err) })
// }

// fetch('https://fkestoreapi.com/products')
//             .then(res=>res.json())            
//             .then(json=>console.log(json))
//             .catch(er=>console.log("not server"))


console.log(add(2,3))