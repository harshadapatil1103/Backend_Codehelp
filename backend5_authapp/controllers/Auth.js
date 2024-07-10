// const bcrypt=require('bcrypt');
// const User=require('../models/User');
// //signup

// exports.signup=async(req,res)=>{
//     try{
//       const {name,email,password,role}=req.body;
//         //existing user
//       const existingUser=await User.findOne({email});
//       if(existingUser){
//         return res.status(400).json({
//             success:false,
//             message:"user not found"
//         });
//       }

//       //new user-secure password and create entry

//       //secure password

//       let hashPassword;
//       try{
//          hashPassword=await bcrypt.hash(password,10);
//       }
//       catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"error in hashing password";
//         });
//       }
//      //create entry for user
//      const user=await User.create({
//         name,email,password:hashPassword,role
//      })


//      return res.status(200).json({
//         success:true,
//         message:"user created successfully",
//      });

    

//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:"try gain",
//         })

//     }
// }

const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt=require('jsonwebtoken');
require('dotenv').config();
//signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }

        // Create a new user entry
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Try again",
            data:error
        });
    }
};


exports.login=async (req,res)=>{
    try{

//data fetch
const {email,password}=req.body;
//valid email and password
if(!email || !password){
    return res.status(401).json({
        success:false,
        message:"invalid email or password",
    })
}
//email exis or not 
let user=await User.findOne({email});

if(!user){
    return res.status(401).json({
        success:false,
        message:"user is not registered yet",
    })
}
const payload={
    email:user.email,
    id:user._id,
    role:user.role,
}
//verify password and generate jwt token

if(await bcrypt.compare(password,user.password)){

    let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",})
 user=user.toObject();
user.token=token;      
user.password=undefined;  //this both operation sperformed on the 
                           //user object not on actual databse
//password should not able to hacke by hacker it is undefine

const options={
  expires:new Date(Date.now()+3*24*60*60*1000), //milisec
  httpOnly:true, //no access on client side

}
res.cookie("token",token,options).status(200).json({
    success:true,
    token,
    user,
    message:'user logged in successfully'
})

}
else{
    //password not match
    return res.status(403).json({
        success:false,
        message:"password incorrect",
    });
}



}


catch(error){

console.log(error);
return res.status(500).json({
    success:false,
    message:"login failure",
});

}
}