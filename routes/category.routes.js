const category_controller= require("../controllers/category.controller")
const middle_w=require("../middlewares/auth.mw")
module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/categories",[middle_w.varifytoken,middle_w.isadmin],category_controller.createNewcotegory)
}