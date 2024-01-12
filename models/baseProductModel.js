import mongoose from "mongoose";

const baseProductSchema = new mongoose.Schema({
    exercises:[{
        exerciseId:mongoose.Schema.Types.ObjectId,
        levels:[{
            level:Number,
            sets:Number,
            reps:Number
        }]
    }],
    info: [{
        lang:String,
        name:String
    }]

})


export default mongoose.model("baseProduct", baseProductSchema,"baseProducts");