import express from 'express';
import TrainingPlanController from "../controller/trainingPlanController.js";
import TrainingController from '../controller/completedTrainingController.js';

import UserController from '../controller/userController.js';


const router = express.Router()



router.get("/trainingplan", TrainingPlanController.trainingPlan)
router.post("/completetraining", TrainingController.completeTraining)




export default router;