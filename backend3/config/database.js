const mongoose=require('mongoose');
require('dotenv').config();
const dbconnect= () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connected succesfully");})
    .catch((err)=>{
     console.error(err);
     console.log("db facing issues");
     process.exit(1);
    })
};

module.exports=dbconnect;

