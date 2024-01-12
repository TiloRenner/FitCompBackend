import User from "../models/userModel.js";




const TrainingPlanController =
{
    trainingPlan : async (req,res)=> 
    {
        const userId = req.session.userId

        const user = await User.findById(userId);
        const {username,email,role} = user;
        

        console.log("UserId: ", userId)
        console.log("User: ", user)


        res.status(200).json({message:"Hallo", userid: userId, plan:"Fake Trainingsplan",username:username,email:email,role:role})
    }


}



export default TrainingPlanController;