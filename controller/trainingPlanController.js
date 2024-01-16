import User from "../models/userModel.js";
import MongooseHelper from "../utils/mongooseHelper.js";




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



        const currentProduct = user.currentProduct

        if(!currentProduct)
        {
            res.status(204).json({message:"No Current Product", plan:null})
        }

        const currentExercises = user.currentProduct.exercises;
        var currentExercisesWithInfo = null

        const levelNames = await MongooseHelper.findLevelNames();
        console.log("LevelNames:" , levelNames)

        const exercisesInfoAll = await Promise.all (currentExercises.map(prodExercise =>
            {
                    return MongooseHelper.findExerciseById(prodExercise.exerciseId)
            }))

        if(exercisesInfoAll && levelNames)
        {
            currentExercisesWithInfo = currentExercises.map((exercise) =>
            {
                const info = exercisesInfoAll.find(info => info._id.equals(exercise.exerciseId))
                const levelInfo = levelNames.find(levelName => levelName.level == exercise.level)
                if(info && levelInfo)
                {
                    const adjustedExercise ={
                        exerciseId: exercise.exerciseId.toString(),
                        level:exercise.level,
                        sets:exercise.sets,
                        reps:exercise.reps,
                        info:info.info,
                        levelName: levelInfo
                    }
                    return adjustedExercise
                }
                else{
                    return exercise;
                }
            })
        }

        const averageLevel = Math.floor(currentExercisesWithInfo.reduce((prev, {level}) =>
        {
            return prev + level
        },0) / currentExercisesWithInfo.length)

        const averageLevelName = levelNames.find(levelName => levelName.level == averageLevel)

        const productWithInfo = {
            category: currentProduct.category,
            info:currentProduct.info,
            averageLevel: averageLevel,
            averageLevelName: averageLevelName,
            exercises : currentExercisesWithInfo
        }



        res.status(200).json({message:"Neuer Trainingsplan wurde erstellt", userid: userId, plan:productWithInfo,role:role})
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