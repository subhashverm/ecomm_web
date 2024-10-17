const jwt= require("jsonwebtoken")
 const auth_configs=require("../configs/auth.config")


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
const varifysigninBody= async(req,res,next)=>{
    if (!req.body.userId){
        return res.status(400).send({
            message:"user id is not provided"
        })
    }
    if (!req.body.password){
         return res.status(400).send({
            message:"password is not provided"
      })
    }
    next()
}
const varifytoken=(req,res,next)=>{
const token =req.headers['x-access -token ']

if(!token){
  return res.status(403).send({
    message:"no token found :unauthorized"
  })
}
jwt.verify(token,auth_configs.secret, async(err,decoded)=>{
    if(err){
        return res.status(401).send({
            message:"unauthorized!"
        })
    }
    const user= await user_model.findOne({userId:decoded.id})
    if(!user){
     return res.status(400).send({
        message:"unauthorized,this user for the token doesn't exit "
     })
        }
        req.user=user
        next()

})

}
const isadmin=(req,res,next)=>{
    const user=req.user
    if(user && userType=="ADMIN"){
next()
    }else{
        return res.status(400).send({
            message:"only admin are allowed to access this end point "
        })
    }

}
module.exports={
    varifysignupBody:varifysignupBody,
    varifysigninBody:varifysigninBody,
    varifytoken:varifytoken,
    isadmin:isadmin
}