const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageURL:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save",async function(doc){
try{
    console.log("DOC",doc);

    //CREATE TRANSPORT
    let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
               user:process.env.MAIL_USER,
               pass:process.env.MAIL_PASS,     
        },
})

//send email
let info=await transporter.sendMail({
    from:`Codehelp`,
    to:doc.email,
    subject:"new file uploaded on cloudinary",
    html:`<h2>Helloo jee</h2> <p>file uploaded</p> View here:<a href="${doc.imageURL}">Image</a>`
})
console.log(info);
}

catch(error)
{
console.error(error)
}
})

const File=mongoose.model("File",fileSchema);
module.exports=File;