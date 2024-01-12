import User from "../models/userModel.js";




const TrainingPlanController =
{
    trainingPlan : (req,res)=> 
    {
        const userId = req.session.userId

        console.log("UserId: ", userId)


        res.status(200).json({message:"Hallo", userid: userId, plan:"Fake Trainingsplan"})
    }


}



export default TrainingPlanController;