const express=require("express");

const app=express();

//middleware
app.use(express.json());

//test
app.get("/test",(req,res)=>{
    res.send("API working");
});

module.exports=app;