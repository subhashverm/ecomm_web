/*
write the logic to signup the user 
*/
const user_model=require("../models/user.model")
const bcrypt=require("bcryptjs")




exports.signup= async (req,res)=>{
// read the request body
const request_body=req.body
// insert the data in the user collections in mb
const userObj={
    name:request_body.name,
    userId:request_body.userId,
    email:request_body.email,
    userType:request_body.userType,
 password: bcrypt.hashSync(request_body.password,8)
}
try{
   const user_created=await user_model.create(userObj)

   const res_obje={
    name:user_created.name,
    userId:user_created.userId,
    email:user_created.email,
    userType:user_created.userType,
    createdAt:user_created.createdAt,
    updatedAt:user_created.updatedAt


   }
   res.status(201).send(res_obje)
    }catch(err){
        console.log("error while the user registering",err)
         res.status(500).send({
        message:" some error while regiserting the user"})
}
}