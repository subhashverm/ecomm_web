const {verify}= require("jsonwebtoken")

const user_model=require("../models/user.model")
const varifysignupBody= async(req,res,next)=>{
    try{
//name
if (!req.body.name){
    return res.status(400).send({
       message:"Failed:name was not provied " 
    })
}
//email
if (!req.body.email){
    return res.status(400).send({
       message:"Failed:email was not provied " 
    })
}
//userId
if(!req.body.userId){
    return res.status(400).send({
        message:"Failed:userid was not provied "

    })
}
const user =await user_model.findOne({userId:req.body.userId})
    if (user){
return res.status(400).send({
    message:"Failed: user with same userID is already"

})

    }
    next()
//userType
//password

    }catch(err){
        console.log("error while validateing the signup")
            res.status(500).send({
                message:"error while validating the request body"
            })
    }
}
module.exports={
    varifysignupBody:varifysignupBody
}