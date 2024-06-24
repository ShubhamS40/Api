const express=require("express")
const router=require("./routes/authentication")
const { urlencoded } = require("body-parser")
const cors=require("cors")
const app=express()
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json())
app.use(urlencoded({extended:false}))

app.use("/",router)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));