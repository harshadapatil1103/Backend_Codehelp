const express=require('express');
const app=express();
//used to parse request body in express->put and post
const bodyParser=require('body-parser')

//specifically parse json data and add it to request body object
app.use(bodyParser.json());

app.listen(3000,()=>{
    console.log("server started at port no 3000");
})

app.get('/',(req,res)=>{
    res.send("kaise ho aap log");
})

app.post('/api/cars',(req,res)=>{
    
   const {name,brand}=req.body;
   console.log(name);
   console.log(brand);
   res.send("car submitted");

})

const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/myDatabase")
.then(()=>{console.log("connection succesful")})
.catch((error)=>{console.log(error)});


