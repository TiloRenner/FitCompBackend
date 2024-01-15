import mongoose from "mongoose";

const userTrainingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    
    },
    exercises:[{
        exerciseId:mongoose.Schema.Types.ObjectId,
        level:Number,
        sets:Number,
        reps:Number,
        results:[]
        
    }],

})

const userTrainingModel = mongoose.model("userTraining", userTrainingSchema,"userTrainings");
export {userProductModel as default , userProductSchema as userProductSchema} ;