
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
            if(!matchingUser.length)
            {
                console.log("Not Found user ", username, " Result: ", matchingUser, " Length: ",matchingUser.length)

                let salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt)
                if(!hashedPassword)
                {
                    console.log("Error creating salt")
                }
                else
                {
                    console.log("CreateNew User", username, "pass: " ,hashedPassword)
                    const newUser = await User.create({
                        username:username,
                        hashedPassword:hashedPassword,
                        role:"user"
                    })
                    res.status(201).json({userCreated: true})
                }
            }
            else
            {
                console.log("Found user ", username, " Result: ", matchingUser, " Length: ",matchingUser.length)
                res.status(409).json({userCreated: false, message:"User already exists"})
                
            }
        }
        catch(err)
        {

        }

    },
    login : async function(req,res)
    {
        console.log("Called Login")

        const {username,password} = req.body

        try{
            const matchingUser = await User.findOne({username:username}).exec()
            if(!matchingUser)
            {
                res.status(404).json({userLoggedIn:false, message:"user does not exist or password incorrect"})
            }
            else
            {
                const hashedPasswordFromDB = matchingUser.hashedPassword;
                const match = await bcrypt.compare(password,matchingUser.hashedPassword)
                console.log("Result",  match)
                if(match)
                {
                    //Todo Send JWT or session
                    res.status(200).json({message: "User logged in"})
                }
                else
                {
                    res.status(404).json({userLoggedIn:false, message:"user does not exist or password incorrect"})
                }
            }

        }
        catch(err)
        {

        }
    }
} 


export default AuthenticationController;