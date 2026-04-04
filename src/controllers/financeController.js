const FinancialRecord = require("../models/FinancialRecord");
const mongoose=require("mongoose");
const createRecord = async (req,res)=>{
    try{
        const {amount,type,category,description} = req.body;

        if(!amount || !type || !category){
            return res.status(400).json({
                success:false,
                message:"Required fields missing"
            });
        }

        if(amount <=0){
            return res.status(400).json({
                success:false,
                message:"Amount must be positive"
            });
        }

        const record = await FinancialRecord.create({
            userId:req.user.userId,
            amount,
            type,
            category,
            description
        });

        res.status(201).json({
            success:true,
            message:"Record created",
            data:record
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getRecords = async (req,res)=>{
    try{
        let records;

        if(req.user.role === "ADMIN"){
            records = await FinancialRecord.find({ isDeleted:false });
        }else{
            records = await FinancialRecord.find({
                userId:req.user.userId,
                isDeleted:false
            });
        }

        res.json({
            success:true,
            data:records
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
const getSingleRecord = async (req,res)=>{

    try{

       if(!mongoose.Types.ObjectId.isValid(req.params.id)){

    return res.status(400).json({
        success:false,
        message:"Invalid record ID"
    });

}

const record = await FinancialRecord.findById(req.params.id);

        if(!record || record.isDeleted){

            return res.status(404).json({
                success:false,
                message:"Record not found"
            });

        }

        // admin can view any
        if(req.user.role === "ADMIN"){

            return res.json({
                success:true,
                data:record
            });

        }

        // user can view only own
        if(record.userId.toString() !== req.user.userId){

            return res.status(403).json({
                success:false,
                message:"Not authorized"
            });

        }

        res.json({
            success:true,
            data:record
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
module.exports = {
    createRecord,
    getRecords,
    getSingleRecord
};