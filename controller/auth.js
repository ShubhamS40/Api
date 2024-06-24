// const userModel=require("../model/user.model")
// const bcrypt=require("bcrypt") // That is Used Convert Plain Text Into Unique Code mean convert password into hash
// const saltround=10;
// const jwt=require("jsonwebtoken")
// const jwtKey="shubham"



// async function handelRegister(req,res){
//     let user=req.body;
//    bcrypt.genSalt(saltround,function(err,salt){
//               bcrypt.hash(user.password, salt,function(err,hash){
//                 if (err) {
//                     console.error('Error generating salt:', err);
//                     res.status(404).json({"error":"password hash is not convert"})
//                 }
//                 user.password=hash;
//                 if (user!=null){
//                     userModel.create(user)
//                     res.json({"data":"inereted sucessfully"})
//                    }
//                    else{
//                     res.status(404).json({"Error":"Not inserted data"})
//                    }

//               })
//    })
// }


// async function handelLogin(req,res){
//     let user=req.body;
//     let result=await userModel.findOne({email:user.email})

//     if(!result){
//         res.status(404).json({"InvalidCreadintail":"User was Not Found"})
//     }

  
//        bcrypt.compare(user.password, result.password,function (err,isMatch){
//         if (err) {
          
//             res.status(404).json({"error":"Error comparing passwords"})
//         }
//         if(isMatch){
//          const token=jwt.sign({id:result.id,email:result.email}, jwtKey,{expiresIn:'1h'})
//             res.json({"Login":"Sucessfull","token":token})
//         }
//         else {
//             // Passwords do not match
//             return res.status(401).json({ error: "Wrong Password" });
//         }
//        })
    
// }





// module.exports={
//     handelRegister,
//     handelLogin
// }


const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
const jwtKey = "shubham";
const saltRounds = 10;

async function handelRegister(req, res) {
    let user = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                console.error('Error generating salt:', err);
                return res.status(404).json({ "error": "password hash is not convert" });
            }
            user.password = hash;
            if (user != null) {
                userModel.create(user)
                    .then(() => res.json({ "data": "inserted successfully" }))
                    .catch(err => res.status(404).json({ "Error": "Not inserted data" }));
            } else {
                res.status(404).json({ "Error": "Not inserted data" });
            }
        });
    });
}

async function handelLogin(req, res) {
    let user = req.body;
    let result = await userModel.findOne({ email: user.email });

    if (!result) {
        return res.status(404).json({ "InvalidCredentials": "User was Not Found" });
    }

    bcrypt.compare(user.password, result.password, function (err, isMatch) {
        if (err) {
            return res.status(404).json({ "error": "Error comparing passwords" });
        }
        if (isMatch) {
            const token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ "Login": "Successful", "token": token ,"name":result.name});
        } else {
            return res.status(401).json({ error: "Wrong Password" });
        }
    });
}

module.exports = {
    handelRegister,
    handelLogin
};

