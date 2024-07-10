const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{

try{
    //extract jwt token
    //pending ither ways to fetch token
    const token=req.body.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"token missing",
        })
    }
    //verify the token
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET); //decpde
        console.log(payload); 

        req.user=payload;

    }
    catch(error){
    res.status(401).json({
        success:false,
        message:"invalid token",
    });
    }
    next();

}
catch(error){
    res.status(401).json({
        success:false,
        message:"something went wrong while verfitying",
    });
}
}

exports.isStudent=(req,res,next)=>{
    try{
             if(req.user.role !=="Student"){
                return res.status(401).json({
                    success:false,
                    message:"this is protected routr for student",
                });
             }
             next();
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"user role not matching",
        })

    }
}

exports.isAdmin=(req,res,next)=>{


try{
    if(req.user.role !=="Admin"){
        return res.status(401).json({
               success:false,
               message:"this is protected routr for admin",
           });
        }
        next();
}
catch(error){

   return res.status(500).json({
       success:false,
       message:"user role not matching",
   })

}
}