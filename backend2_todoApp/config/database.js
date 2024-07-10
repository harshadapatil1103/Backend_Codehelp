const mongoose=require("mongoose");

require("dotenv").config();  //due to this whatever we written in env will be strode in process object
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL) //fetch url through this process object
.then(()=>{console.log("db connection done")})
.catch((error)=>{console.log("error occured");
    console.error(error.message);
    process.exit(1);
});
}

module.exports=dbConnect;