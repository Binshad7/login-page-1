const crypto = require("crypto");


const obj = {
    userName:'binshad',
    password:'773643'
}

module.exports = {
    
    doSignup:(name,password)=>{
        console.log(name, password)
    return new Promise((res,rej)=>{
        if(obj.userName==name && obj.password == password){
             res(obj.userName)
        }else{
             rej("user not valid")
        }
    })
}
}