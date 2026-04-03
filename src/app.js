const express=require("express");

const app=express();
const authRoutes = require("./routes/authRoutes");
//middleware
app.use(express.json());

//test
app.get("/test",(req,res)=>{
    res.send("API working");
});
app.use("/auth", authRoutes);

module.exports=app;