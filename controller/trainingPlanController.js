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

        const productWithInfo = {
            category: currentProduct.category,
            info:currentProduct.info,
            exercises : currentExercisesWithInfo
        }



        res.status(200).json({message:"Hallo", userid: userId, plan:productWithInfo,role:role})
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