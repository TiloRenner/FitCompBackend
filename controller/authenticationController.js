
import MongooseHelper from "../utils/mongooseHelper.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';

//MongooseHelper.connectDB()
const cookiedomain = process.env.cookiedomain
const oneDay = 1000*60*60*24;

const AuthenticationController = {


    register: async function(req,res)
    {
        console.log("Called Register",req.session)

        const {username,password,email} = req.body

        try{
            const matchingUser = await User.find({username:username}).exec()
            if(!matchingUser.length)
            {
                console.log("Not Found user ", username, " Result: ", matchingUser, " Length: ",matchingUser.length)

                let salt = await bcrypt.genSalt(10);
                console.log("salt")
                const hashedPassword = await bcrypt.hash(password,salt)

                console.log("hash")
                if(!hashedPassword)
                {
                    console.log("Error creating salt")
                }
                else
                {
                    console.log("CreateNew User", username, "pass: " ,hashedPassword)
                    const newUser = await User.create({
                        username:username,
                        email:email,
                        password:hashedPassword,
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

        console.log("Username: ", username, "pass: ", password)

        try{
            const matchingUser = await User.findOne({username:username}).exec()
            if(!matchingUser)
            {
                console.log("No Matching User")
                res.status(404).json({userLoggedIn:false, message:"user does not exist or password incorrect"})
            }
            else
            {
                const hashedPasswordFromDB = matchingUser.password;
                const match = await bcrypt.compare(password,matchingUser.password)
                console.log("Result",  match)
                if(match)
                {
                    //Todo Send JWT or session
                    console.log("Sending Cookie?" ,req.session)
                    req.session.isAuth = true;
                    req.session.userId = matchingUser._id;
                    req.session.role = matchingUser.role;
                    console.log("Sending Cookie?" ,req.session)
                    console.log("Sending CookieID" ,req.sessionID)

                    //res.cookie('sessionPWTest',"MyOwnCookie" + matchingUser._id, {maxAge:oneDay,domain:cookiedomain , sameSite:'none', secure: true, partitioned: true })
                    //res.cookie('fitcomp2.sid',req.session, {maxAge:oneDay,domain:cookiedomain , sameSite:'none', secure: true, partitioned: true })
                    res.status(200).json({message: "User logged in", role:matchingUser.role})
                }
                else
                {
                    res.status(401).json({userLoggedIn:false, message:"user does not exist or password incorrect"})
                }
            }

        }
        catch(err)
        {

        }
    },
    logout : (req,res) =>
    {
        console.log("logout")
        console.log("SessionID:" ,req.sessionID)
        req.session.destroy()
        res.clearCookie('fitcomp.sid')
        res.status(200).json({test:"test"})
    },
    status : (req,res) =>
    {
        console.log("logout")
        console.log("SessionID:" ,req.sessionID)
        const role = req.session.role
        res.status(200).json({message: "User logged in", role:role})
    }
} 


export default AuthenticationController;