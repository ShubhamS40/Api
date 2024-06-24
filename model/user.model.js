const mongoose=require("mongoose")
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then((data)=>console.log("mongo db connected \n sucessfully")).catch((err)=>console.log("Something went Wrong",err))
const userSchema= mongoose.Schema({
     name:{
        type:String,
        required:[true,"Name is mandatory"]
     },
     email:{
        type:String,
        unike:true,
        required:[true,"Email is mandatory"]
     },
     password:{
        type:String,
        unike:true,
        required:[true,"Password is mandatory"]
     }
},{timestamps:true})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel