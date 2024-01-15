import mongoose from "mongoose";
import { userProductSchema } from "./userProductModel.js";



const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique:true},
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum: ['admin', 'user'] 
    },
    currentProduct: userProductSchema
}
);

export default mongoose.model("User", userSchema);