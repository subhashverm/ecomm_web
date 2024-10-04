const express=require("express")
const mongoose=require("mongoose")
const app =express()
const server_configs=require("./configs/server.configs")
const db_config=require("./configs/db.config")
const user_model=require("./models/user.model")
const bcrypt=require("bcryptjs")


app.use(express.json())
/**
 connection with mongo 
 */
mongoose.connect(db_config.DB_URL)
const db= mongoose.connection
db.on("error",()=>{
    console.log("error while connecting to data base")
})
db.once("open",()=>{
    console.log("connecting to data base")
    init()
})


 async function init(){
 let user= await user_model.findOne({userId :"admin"})
 if(user){
    console.log("Admin is already present ")
    return
 }
 try{
  user=await user_model.create({
    name:"subhash",
    userId:"admin",
    Email:"subverma8090@gmail.com",
    userType:"ADMIN",
    password:bcrypt.hashSync("welcome",8)
  })
  console.log("admin created",user)
 }catch(err){
    console.log("error while create the admin",err)
 }
}
/**
 * stich the rout the server 
 */
require("./routes/auth.route")(app)
/**
 * 
 * start the  server
 */
app.listen(server_configs.PORT,()=>{
    console.log("server started at port number", server_configs.PORT)
})
