import MongooseHelper from "../utils/mongooseHelper.js";
import userModel from "../models/userModel.js";
import TrainingPlanController from "./trainingPlanController.js";
import exerciseModel from "../models/exerciseModel.js";
import completedTraining from "../models/completedTraining.js";
import mongoose from "mongoose";

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
        var amountTrainings = 0;
        var amountRepsOverall = 0;

        const levelNames = await MongooseHelper.findLevelNames();
        console.log("LevelNames:" , levelNames)

        const MongUserId = new mongoose.Types.ObjectId(userId)
        console.log("RealUID:" , MongUserId)

        const completedTrainings = await MongooseHelper.getAllCompletedTrainingsForUserId(userId)
        const test = await completedTraining.aggregate([
            {$match:{userId: MongUserId}}])
                
        console.log("Overall Repetitions" ,test)

        if(completedTrainings)
        {
            console.log("TrainingsGesamt" , completedTrainings.length, " INhalt " , completedTrainings)
            amountTrainings = completedTrainings.length;

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

            const dashboardData = {plan:currentExercisesWithInfo, trainingData:trainingData, trainingsDone:amountTrainings , timeTrained: amountTrainings * 12 }

            res.status(200).json(dashboardData)

        }





    }


}

export default DashboardController