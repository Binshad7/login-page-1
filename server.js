const express = require('express');
const path = require('path')
const hbs = require('hbs')
const app = express();
const session = require("express-session");
const cache = require('nocache')
const userHelpers = require('./userHelpers') 

app.use(cache()) 
app.use(session({
    secret: "key",
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 1000*60*60*24}
}))
app.use(express.urlencoded({extended:false}))
app.use(express.static ('public'));
// app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'hbs')

app.use((req,res,next)=>{
    res.set('Cache-Control','no-store');
    next()
})

 let verification = (req,res,next)=>{
    if(req.session.loggedIn){
        next();
    }else{
        res.redirect('/login')
    }
 }
 
app.get("/", verification, (req, res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
    }else{
        res.render('login',{err:req.session.err})
 req.session.err = '';
}
 
})
// user  validation 
app.post("/validation",(req,res)=>{
    console.log(req.query);
    
    let userData = req.body
    userHelpers.doSignup(userData.name , userData.password)
    .then((response)=>{
        console.log(response);
        req.session.user = response;
        req.session.loggedIn=true;
        
        res.redirect('/')
    })
    .catch((err)=>{
        req.session.loggedIn = false
        req.session.err = err
        res.redirect("/login")
    })
})

 // logout
app.get("/logout",verification,(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

app.all('*',(req,res)=>{
    res.send("<h1>Page Is Not Found 404 !!!!")
})
app.listen(4000)
