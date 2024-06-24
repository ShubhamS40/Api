const contactModel=require("../model/contact.model")
const dotenv = require('dotenv');

dotenv.config();
async function handleContact(req,res){
    let contact=req.body;
    let result=contactModel.create(contact)
    if(result!=null){
        res.json({
            "data":"inserted sucessfully"
        })
    }
    else{
        res.status(404).json({
            "error":"something went wrong"
        })
    }
}
module.exports=handleContact