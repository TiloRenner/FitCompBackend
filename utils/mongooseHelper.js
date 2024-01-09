

import 'dotenv/config';
import mongoose from 'mongoose';

const MongooseHelper = 
{

    connectDB : async function()
    {
        try{
            mongoose.connect(process.env.DB_URI,{serverSelectionTimeoutMS: 1000})
            const db = mongoose.connection
            db.on('connected', ()=> console.log('Mongoose Connected'))
            db.on('error', console.error.bind(console, 'connection error:'))
            db.on('disconnected',function(){console.log("Disconnected DB")})
            db.once('open', function(){console.log('DB Connected')})
            db.on('timeout',function(err){ console.log("Timeout: " ,err.message)})
        }
        catch(err)
        {
            console.log("MongooseError:" ,err.message)
        }


    }



}

export default MongooseHelper