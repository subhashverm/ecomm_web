 const mongoose=require("mongoose")

 const userschema=new mongoose.Schema(
    {
    name:{
    type: String,
    required:true
    },
    userId:{
        type:String,
        unique:true,
       required:true
    },
password:{
    type:String,
    required:true
},
email:{
    type: String,
   required:true,
    lowercase:true,
    unique:true,
    minilength:10
},
userType:{
    type: String,
    default:"customer",
    enum:["CUSTOMER","ADMIN"],
    requried:true
}
},{timestamps:true,versionKey:false})
module.exports=mongoose.model("user",userschema)
