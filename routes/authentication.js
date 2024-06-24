const express =require("express")
const router=express.Router()
const {handelRegister,handelLogin}=require("../controller/auth")
const handleContact=require("../controller/contact")
const dotenv = require('dotenv');

dotenv.config();

router.use("/register",handelRegister)
router.use("/login",handelLogin)
router.use("/contact",handleContact)

module.exports=router