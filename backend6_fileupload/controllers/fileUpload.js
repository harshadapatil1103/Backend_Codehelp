const File=require("../models/File");
const cloudinary=require('cloudinary').v2;
//local file upload handler function

exports.localFileUpload=async(req,res)=>{
    try{
       const file=req.files.file; //fetch file
       console.log("file aagayi->",file);
       let path= __dirname +"/files" +Date.now() + `.${file.name.split('.')[1]}`; //kis path pe store karna chahate hai
          //"-dirname shows  current directory";
          console.log(path);
        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:true,
            message:"local file uploaded successfully",
        })
    }
    catch(error){
        console.log(error);
    }
}


//functions which used in imageUpload handler and video upload handler
function isFileTypeSupported(type,supportedType){
 return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
   if(quality){
    options.quality=quality;
   }
    options.resource_type="auto";
   return await cloudinary.uploader.upload(file.tempFilePath,options);

}

//image upload ka handler


exports.imageUpload=async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        //fetch file
        const file=req.files.imageFile;
        console.log(file);

        //validation of file
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate is not supported ",
            });
        }
        //file formate is supported
        const response=await uploadFileToCloudinary(file,"Codehelp");
       console.log(response);

        //save the entry indb
        const fileData=await File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
        })
        res.json({
            success:true,
            imageURL:response.secure_url,
            message:"image successfully uploaded",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"error occured",
            

        })
    }
}

exports.videoUpload=async(req,res)=>{
try{
    const {name,email,tags}=req.body;
    console.log(name,tags,email);

    const file=req.files.videoFile;
    console.log(file)

    //validity

    const supportedTypes=["mp4","mov"];
    const fileType=file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"file formate is not supported ",
        });
    }
    //if valid upload on cloudinart
    const response=await uploadFileToCloudinary(file,"Codehelp");
    console.log(response);


    //save entry in databse
    const fileData=await File.create({
        name,
        tags,
        email,
        imageURL:response.secure_url,
    })
    res.json({
        success:true,
        imageURL:response.secure_url,
        message:"video successfully uploaded",
    })

}
catch(error){
res.status(400).json({
    success:false,
    message:"something went wronge",
})
}
}

exports.imageSizeReducer=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        //fetch file
        const file=req.files.imageFile;
        console.log(file);

        //validation of file
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate is not supported ",
            });
        }
        //file formate is supported
        const response=await uploadFileToCloudinary(file,"Codehelp",30);
       console.log(response);

        //save the entry indb
        const fileData=await File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
        })
        res.json({
            success:true,
            imageURL:response.secure_url,
            message:"image successfully uploaded",
        })
    }
    catch(error){
        console.error(error);

    }

}