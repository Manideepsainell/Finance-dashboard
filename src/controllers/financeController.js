const FinancialRecord = require("../models/FinancialRecord");
const mongoose = require("mongoose");

const createRecord = async (req,res)=>{
    try{
        const {amount,type,category,description} = req.body;

     if(amount === undefined || !type || !category){
            return res.status(400).json({
                success:false,
                message:"Required fields missing"
            });
        }
        if(typeof amount !== "number"){

    return res.status(400).json({
        success:false,
        message:"Amount must be a number"
    });

}

        if(amount <=0){
            return res.status(400).json({
                success:false,
                message:"Amount must be positive"
            });
        }
        if(!["credit","debit"].includes(type)){

    return res.status(400).json({
        success:false,
        message:"Type must be credit or debit"
    });

}
if(category.length < 3){

    return res.status(400).json({
        success:false,
        message:"Category too short"
    });

}
if(description && description.length > 200){

    return res.status(400).json({
        success:false,
        message:"Description too long"
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
            records = (await FinancialRecord.find({ isDeleted:false }).sort({createdAt:-1}));
        }else{
            records = await FinancialRecord.find({
                userId:req.user.userId,
                isDeleted:false
            }).sort({createdAt:-1});
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

        if(req.user.role === "ADMIN"){
            return res.json({
                success:true,
                data:record
            });
        }

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

const deleteRecord = async (req,res)=>{
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

        if(req.user.role !== "ADMIN"){
            if(record.userId.toString() !== req.user.userId){
                return res.status(403).json({
                    success:false,
                    message:"Not authorized"
                });
            }
        }

        record.isDeleted = true;
        await record.save();

        res.json({
            success:true,
            message:"Record deleted"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
const updateRecord = async (req,res)=>{

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

        // access control
        if(req.user.role !== "ADMIN"){

            if(record.userId.toString() !== req.user.userId){

                return res.status(403).json({
                    success:false,
                    message:"Not authorized"
                });

            }

        }

        const {amount,category,description,type} = req.body;

        // update fields only if provided

        if(amount !== undefined){

            if(amount <=0){
                return res.status(400).json({
                    success:false,
                    message:"Amount must be positive"
                });
            }

            record.amount = amount;
        }

        if(category){
            record.category = category;
        }

        if(description){
            record.description = description;
        }

        if(type){

            if(!["credit","debit"].includes(type)){

                return res.status(400).json({
                    success:false,
                    message:"Invalid type"
                });

            }

            record.type = type;

        }

        await record.save();

        res.json({

            success:true,

            message:"Record updated",

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
const getSummary = async (req,res)=>{

    try{

        // only admin
        if(req.user.role !== "ADMIN"){

            return res.status(403).json({
                success:false,
                message:"Admin access required"
            });

        }

        const summary = await FinancialRecord.aggregate([

            {
                $match:{isDeleted:false}
            },

            {
                $group:{
                    _id:"$type",
                    total:{$sum:"$amount"}
                }
            }

        ]);

        let totalCredit = 0;
        let totalDebit = 0;

        summary.forEach(item => {

            if(item._id === "credit"){
                totalCredit = item.total;
            }

            if(item._id === "debit"){
                totalDebit = item.total;
            }

        });

        res.json({

            success:true,

            data:{
                totalCredit,
                totalDebit,
                balance: totalCredit - totalDebit
            }

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
    getSingleRecord,
    updateRecord,
    deleteRecord,
    getSummary
};