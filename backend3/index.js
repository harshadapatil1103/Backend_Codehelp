const express=require('express');
const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 4000;

//middleware
app.use(express.json());

//mount
const blog=require("./routes/blog");
app.use("/api/v1",blog);


app.get("/",(req,res)=>{
 res.send(`<h1>this is home page</h1>`);
})

const dbconnect=require("./config/database")
dbconnect();

app.listen(PORT,()=>{
    console.log("app running succesfully");
})
