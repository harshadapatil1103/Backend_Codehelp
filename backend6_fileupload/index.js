const express=require('express');
const app=express();

require('dotenv').config();
const PORT=process.env.PORT || 5000;

//middleware add
app.use(express.json());
const fileupload=require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})); //we can upload files using this middleware on server

//connect with db
const dbConnect=require('./config/database');
dbConnect();
///connect with cloud
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//mount api route

const Upload=require('./routes/FileUpload');
app.use('/api/v1/upload',Upload);





//activate server
app.listen(PORT,()=>{
    console.log(`server created succefully at ${PORT}`);
})

