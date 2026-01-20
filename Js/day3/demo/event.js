/*

event=>runtime


*/
// document.getElementById("click").onclick=function(){
//     alert("hello")
// }
//addEventListiner

// document.getElementById("click").addEventListener('click',function(e){
// // alert('addEventListener')

// console.log(e);
// console.log(e.target);
// console.log(e.type);


// })

// function test(e){
//     console.log(e);
    
    // console.log(e.target);
    
// if(e.type=='click')
//     console.log('click');
// else if(e.type=='dblclick'){
//   console.log('dbclick');
// }
// }

//preventDefault
// document.getElementById("test").addEventListener('copy',function(e){
//      console.log(e.key);

//     if(document.getElementById("test").value.length==8){
//         console.log("stop");
        
//     }
// var regex=/^[a-z]$/
//     if(regex.test(e.key)){
//         console.log("vaild");
        
//     }else{
//         e.preventDefault()
//         console.log("not vaild");
        
//     }
// console.log(`ctrl ${e.ctrlKey}`);
// console.log(`shift ${e.shiftKey}`);
// console.log(`alt ${e.altKey}`);
// if(e.ctrlKey&&e.key=='c'){
//     e.preventDefault()
// }
// e.preventDefault()
// })

// document.getElementById("test").addEventListener('input',function(e){
//     //  console.log(e.key);

//     if(document.getElementById("test").value.length==8){
//         console.log("stop");
        
//     }

    
// })
//hover
// document.getElementById("mouse").addEventListener("mouseenter",function(){
//     console.log("mouse enter");
    
// })
// document.getElementById("mouse").addEventListener("mouseout",function(){
//     console.log("mouse out");
    
// })
// document.getElementById("mouse").addEventListener("mousemove",function(){
//     console.log("mouse move");
    
// })

//event bubbly

// document.getElementById("mouse").addEventListener('click',function(){
//     console.log('parent');
    
// })
// document.getElementById("child").addEventListener('click',function(e){
//    e.stopPropagation()
   
//     console.log('child');
    
// })