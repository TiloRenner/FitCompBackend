import MongooseHelper from "../utils/mongooseHelper.js";
import completedTraining from "../models/completedTraining.js";

const TrainingController = {

    completeTraining : async (req,res)=> 
    {
        const userId = req.session.userId
        //const user = await User.findById(userId);

        const {completedExercises} = req.body
        console.log("ExercisesDone:", completedExercises)

        MongooseHelper.createCompletedTraining(userId,completedExercises)


        //Check Incoming Data, need array with Exercise IDs and reps done

        //find existing Training Data for user

        res.status(200).json({message:"Completed Training added"})




    }





}

export default TrainingController