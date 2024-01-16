import MongooseHelper from "../utils/mongooseHelper.js";
import completedTraining from "../models/completedTraining.js";

const TrainingController = {

    completeTraining : async (req,res)=> 
    {
        const userId = req.session.userId
        const user = await User.findById(userId);

        

        //Check Incoming Data, need array with Exercise IDs and reps done

        //find existing Training Data for user





    }





}

export default TrainingController