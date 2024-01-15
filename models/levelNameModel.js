import mongoose from "mongoose";

const levelNameSchema = new mongoose.Schema(
{
    level:Number,
    text:[{
        lang:String,
        name:String
    }]
})


export default mongoose.model("levelName",levelNameSchema, "levelNames")