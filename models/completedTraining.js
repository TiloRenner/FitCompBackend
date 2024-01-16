import mongoose from "mongoose";


const completedTrainingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    completedExercises:[
        {
            exerciseId:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
            },
            repsFull:{
                type:Number,
                required:true
            }
        }
    ]
},{timestamps:true})

export default mongoose.model("completedTraining", completedTrainingSchema,"completedTrainings");