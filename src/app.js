const express=require("express");

const app=express();
const authRoutes = require("./routes/authRoutes");
const financeRoutes = require("./routes/financeRoutes");
//middleware
app.use(express.json());

//test
app.get("/test",(req,res)=>{
    res.send("API working");
});
app.use("/auth", authRoutes);
app.use("/finance", financeRoutes);
module.exports=app;