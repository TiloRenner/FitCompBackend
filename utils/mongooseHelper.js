

import 'dotenv/config';
import mongoose from 'mongoose';
import baseProduct from '../models/baseProductModel.js'
import exercise from '../models/exerciseModel.js';

const MongooseHelper = 
{

    connectDB : async function()
    {
        try{
            await mongoose.connect(process.env.DB_URI,{serverSelectionTimeoutMS: 1000})
            const db = mongoose.connection
            db.on('connected', ()=> console.log('Mongoose Connected'))
            db.on('error', console.error.bind(console, 'connection error:'))
            db.on('disconnected',function(){console.log("Disconnected DB")})
            db.once('open', function(){console.log('DB Connected')})
            db.on('timeout',function(err){ console.log("Timeout: " ,err.message)})
            return db;
        }
        catch(err)
        {
            console.log("MongooseError:" ,err.message)
            return null;
        }


    },

    findUser: async function(username)
    {

    },

    findAllProducts: async function()
    {
        try{
            console.log("Start getting products")
            const products = await baseProduct.find();
            console.log("Products Inside: ", products)
            return products
        }
        catch(err){
            console.log("Error getting products",err.message)
            return null;
        }
    },
    findProductByCategory:async function(category)
    {
        try{
            const product = await baseProduct.findOne({category:category});
            return product;
        }
        catch(err)
        {
            console.error("Error finding Product: ", err.message)
        }

    },
    findExerciseById: async function(id)
    {
        try{
            const matchingExercise = await exercise.findById(id)

            return matchingExercise;
        }
        catch(err)
        {
            console.error("Error getting Product with ID " , id , " :" , err.message)
        }

    },
    returnObjectIdFromHextString : function(id)
    {
                const obId = mongoose.Types.ObjectId.createFromHexString(id)
                return obId;
    }



}

export default MongooseHelper