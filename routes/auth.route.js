//post call 
const middle_w=require("../middlewares/auth.mw")
const authcontroller=require("../controllers/auth.controllers")
module.exports=(app)=>{

    app.post("/ecomm/api/v1/auth/signup",[middle_w.varifysignupBody],authcontroller.signup)
    app.post("/ecomm/api/v1/auth/signin",[middle_w.varifysigninBody],authcontroller.signin)
}
