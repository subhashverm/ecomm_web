// name
// discrption
const mongoose=require("mongoose");
const categoryschema= new mongoose.Schema({
    name :{
type:String,
requried:true,
unique:true 
    },
    discription:{
        type:String,
        requried:true,
    }

},{ timestamps:true,versionKey:false })
module.exports=mongoose.model("category",categoryschema)


