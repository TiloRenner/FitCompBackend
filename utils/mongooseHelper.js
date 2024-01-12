

import 'dotenv/config';
import mongoose from 'mongoose';
import baseProduct from '../models/baseProductModel.js'

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
    }



}

export default MongooseHelper