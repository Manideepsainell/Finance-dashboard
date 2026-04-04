const express=require("express");

const app=express();
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
//middleware
app.use(express.json());

//test
app.get("/test",(req,res)=>{
    res.send("API working");
});
app.get("/protected", protect, (req,res)=>{

    res.json({
        success:true,
        message:"Protected route works",
        user:req.user
    });

});
app.use("/auth", authRoutes);

module.exports=app;