/*
write the logic to signup the user 
*/
const user_model=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")




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
 //responce back to user for signin
 exports.signin= async (req,res)=>{
 //user id present in the system 
 const user= await user_model.findOne({userId: req.body.userId})
 if (user==null){
    return res.status(400).send({
        message:"user id passed is not vaild user id "
    })
 }
//check password is correct
const ispasswordvalid=bcrypt.compareSync(req.body.password,user.password)
if(!ispasswordvalid){
   return res.status(401).send({
        message:"worng password passed"
    })
}
//passed the token 
const token =jwt.sign({id:user.userId},"my abc secret ",{
    expiresIn:120
})
res.status(200).send({
    name:user.name,
    userId:user.userId,
    email:user.email,
    userType:user.userType,
    accessToken:token

})
 }