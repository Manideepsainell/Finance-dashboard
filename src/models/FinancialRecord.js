const mongoose=require("mongoose");

const financialRecordSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },

    amount:{
        type:Number,
        required:true
    },

    type:{
        type:String,
        enum:["credit","debit"],
        required:true
    },

    category:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    isDeleted:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("FinancialRecord", financialRecordSchema);