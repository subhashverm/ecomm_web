/**
 * controller for creating a category
 * post
 *  localhost:8000/ecomm/api/v1/categories
 {"name" : "
 electronics"
 "discription":"herte all type of electronic atoms are avalible "}
 */



const category_model= require("../models/category.model")
exports.createNewcotegory= async(req,res)=>{
   
// read the req body
const cate_data ={
    name:req.body.name,
    discription:req.body.discription
}
try{
//create the category object
//insert into mongodb
 const category =await category_model.create(cate_data)
return res.status(201).send(category)
}
catch(err){
    console.log("error while inerting data oin db",err)
    return res.status(500).send({
        message:"error while creating category"

    })
}
//return the responce of the created category

}