
import MongooseHelper from "../utils/mongooseHelper.js";
import User from "../models/userModel.js";

import bcrypt from 'bcrypt';


//MongooseHelper.connectDB()

const AuthenticationController = {

    register: async function(req,res)
    {
        console.log("Called Register")

        const {username,password} = req.body

        try{
            const matchingUser = await User.find({username:username}).exec()

            console.log("MatchingL:" ,matchingUser.length)
            if(!matchingUser.length)
            {
                console.log("Not Found user ", username)
                console.log("Matching:" ,matchingUser)
                console.log("MatchingL:" ,matchingUser.length)

                let salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt)
                if(!hashedPassword)
                {

                }
                else
                {
                    console.log("CreateNew User", username, "pass: " ,hashedPassword)
                    const newUser = await User.create({
                        username:username,
                        hashedPassword:hashedPassword,
                        role:"User"
    
                    })
                }
            }
            else
            {
                console.log("Matching:" ,matchingUser)
                console.log("MatchingL:" ,matchingUser.length)
                console.log("User found ", username)

            }





        }
        catch(err)
        {

        }

    }



} 


export default AuthenticationController;