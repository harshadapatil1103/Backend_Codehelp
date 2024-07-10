const express=require('express');
const app=express();

app.use(express.json());

require('dotenv').config();

app.listen(process.env.PORT,()=>{
    console.log("server created successfully");
})

app.get("/",(req,res)=>{
    res.send("<h1>server page</h1>")
})

const dbConnect=require('./config/database');
dbConnect();