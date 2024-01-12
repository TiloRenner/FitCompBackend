import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({

    info:[{
        lang:{type:String, required:true},
        name:{type:String, required:true},
        desc:{type:String, required:true},
        instructionURL:{type:String, required:true},
        instructions:{type:String, required:true},

    }]


})


export default mongoose.Model("exercise")