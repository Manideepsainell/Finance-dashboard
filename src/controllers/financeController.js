const FinancialRecord = require("../models/FinancialRecord");
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
module.exports = {
    createRecord
};