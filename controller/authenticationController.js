
import MongooseHelper from "../utils/mongooseHelper.js";

//MongooseHelper.connectDB()

const AuthenticationRouter = {

    register: async function(req,res)
    {
        console.log("Called Register")

        const {username,password} = req.body

        try{


        }
        catch(err)
        {

        }

    }



} 


export default AuthenticationRouter;