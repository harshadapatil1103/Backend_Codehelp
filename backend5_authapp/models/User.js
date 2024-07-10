const mongoose=require("mongoose");
const dbconnect = require("../config/database");
const userSchema=new mongoose.Schema({
    name:{
     type:String,
     required:true,
     trim:true,

    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","Student","Visitor"]
}
});

module.exports=mongoose.model("user",userSchema);

// Default Connection: When you call mongoose.connect(), it creates a default connection.
//Model Registration: When you call mongoose.model("User", userSchema);, Mongoose registers the model with the default connection.
//Model Usage: Any subsequent use of the model (e.g., User.create()) uses the default connection to interact with the database.