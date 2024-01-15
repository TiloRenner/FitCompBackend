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
        console.log("Product: " , user.currentProduct)
        console.log("Exercises: ")

        //Hole die passenden Übungsnamen

        //Hole die passenden Levelnamen


        res.status(200).json({message:"Hallo", userid: userId, plan:user.currentProduct,username:username,email:email,role:role})
    },
    setTrainingPlan : async (req,res) =>
    {
        const userId = req.session.userId
        const body = req.body
        const user = await User.findById(userId);
        const {username,email,role} = user;
        console.log("User ", user , "with UserId " , userId , " wants to change their TrainingPlan")
        console.log("Body:" , body)
    }


}



export default TrainingPlanController;