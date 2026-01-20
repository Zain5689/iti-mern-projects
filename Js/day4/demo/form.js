function vaildation(input){
    
    if(input.value==""){
        input.nextElementSibling.textContent="plz e your data"
        input.style.border="1px solid red"
        return false;
    }
    else if(input.value.length<=3){
       input.nextElementSibling.textContent="plz e more t 3char"
 input.style.border="1px solid red"
    return false;
    }else{
         input.nextElementSibling.textContent=""
          input.style.border="1px solid green"
             return true;
    }
}
function sendData(e){
var username=document.querySelector('input[name="username"]')
var pass=document.querySelector('input[name="pass"]')
if(!vaildation(username)||!vaildation(pass)){
    e.preventDefault()
}
else if(username.value!="admin@123"&&pass.value!="admin99"){
     e.preventDefault()
     alert("not vaild")
}else{
    alert("vaild")
}
}

// document.querySelector("#select").addEventListener('change',function () {
//     console.log(this.options[this.selectedIndex]);
    
    
// })
var select=document.querySelector("#select")
var op=document.createElement("option")
op.textContent="nodejs"
select.appendChild(op)