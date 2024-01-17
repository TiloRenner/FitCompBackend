import MongooseHelper from "../utils/mongooseHelper.js";
import userModel from "../models/userModel.js";
import TrainingPlanController from "./trainingPlanController.js";

const DashboardController = {
    
    getDashboardData : async (req,res) =>
    {
        const secondsPerRep = 10;

        const userId = req.session.userId

        const user = await userModel.findById(userId);
        const currentProduct = user.currentProduct
        const {username,email,role} = user;

        var trainingData = null
        var currentExercisesWithInfo = null;

        const levelNames = await MongooseHelper.findLevelNames();
        console.log("LevelNames:" , levelNames)


        const completedTrainings = await MongooseHelper.getAllCompletedTrainingsForUserId(userId)

        if(completedTrainings)
        {


        }
        else
        {

        }

        if(!currentProduct)
        {
            res.status(204).json({message:"No Current Product", plan:null})
        }
        else{
            const currentExercises = user.currentProduct.exercises;


            const exercisesInfoAll = await Promise.all (currentExercises.map(prodExercise =>
                {
                        return MongooseHelper.findExerciseById(prodExercise.exerciseId)
                }))
    
            if(exercisesInfoAll && levelNames)
            {
                currentExercisesWithInfo = await TrainingPlanController.buildExercisesWithInfo(currentExercises,exercisesInfoAll,levelNames)
            }

        }



        const dashboardData = {plan:currentExercisesWithInfo, trainingData:trainingData}

        res.status(200).json(dashboardData)

    }


}

export default DashboardController