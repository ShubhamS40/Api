const express=require("express")
const router=require("./routes/authentication")
const { urlencoded } = require("body-parser")
const cors=require("cors")
const app=express()
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
    origin: "https://ss-developer.vercel.app", // Replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json())
app.use(urlencoded({extended:false}))

app.use("/",router)
app.get("/",(req,res)=>{
res.send("hello shubham")
})

app.post("/shubham",(req,res)=>{
    let body=req.body
    res.json(body)
    })


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));