const express=require("express");
const router=express.Router();

const {login,signup}=require("../controllers/Auth")
const {auth,isStudent,isAdmin}=require("../middlewares/auth")
// router.post("/login",login);
router.post('/signup',signup);
router.post('/login',login);

//test route
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for test",
    });
})


//protected routes
router.get("/student",auth,isStudent,(re,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for students",
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to the protected route for students",
    });
});

module.exports=router;