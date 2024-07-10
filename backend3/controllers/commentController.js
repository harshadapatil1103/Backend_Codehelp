//import model

const Post=require("../models/postModel");
const Comment=require("../models/commentModel");

exports.createComment=async (req,res)=>{
    try{
//fetch data from req body
const {post,user,body}=req.body;

//create comment object
const comment=new Comment({post,user,body});

//save the new comment into your database
const savedComment= await comment.save();
//find the post by id andd new comments to its comments array
const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
                       .populate("comments") //populate the comments array with comments document
                       .exec();
    
    res.json({
        post:updatedPost,
    });
    }                  
    catch(err){
   return res.status(500).json({
    error:"error while creating comment",
   });
    }
};




