const mongoose=require('mongoose');

require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("db connected succesfully");

    })
    .catch((err)=>{
     console.error(err);
     console.log("error while connecting data base");
     process.exit(1);
    })
}
module.exports=dbConnect;

