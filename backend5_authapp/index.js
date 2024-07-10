const express=require('express');
const app=express();

require('dotenv').config();
const PORT=process.env.PORT ||8000;

app.use(express.json());


const user=require('./routes/user');
app.use("/api/v1",user);

const dbconnect=require('./config/database');
dbconnect();


app.listen(PORT,()=>{
    console.log(`server created successfully with the port ${PORT}`)
})
app.get("/",(req,res)=>{
    res.send("<h1>server page</h1>")
})



