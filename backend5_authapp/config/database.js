const mongoose=require('mongoose');

require('dotenv').config();

const dbconnect=()=>{
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
console.log("database connected successfully to atlas");

})
.catch((err)=>{
    console.log("error while connecting data");
    console.error(err);
    process.exit(1);

})
}

module.exports=dbconnect;