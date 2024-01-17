import mongoose from "mongoose";

const userProductSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    
    },
    exercises:[{
        exerciseId:mongoose.Schema.Types.ObjectId,
        level:Number,
        sets:Number,
        reps:Number
        
    }],
    info: [{
        lang:String,
        name:String
    }],
    category:   {
        type:String,
        required:true,
        unique:true,
    }   

},{timestamps:true})

const userProductModel = mongoose.model("userProduct", userProductSchema,"userProducts");
export {userProductModel as default , userProductSchema as userProductSchema} ;