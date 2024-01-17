import express from 'express';
import TrainingPlanController from "../controller/trainingPlanController.js";
import TrainingController from '../controller/completedTrainingController.js';
import DashboardController from '../controller/dashboardController.js';

import UserController from '../controller/userController.js';


const router = express.Router()



router.get("/trainingplan", TrainingPlanController.trainingPlan)
router.get("/dashboard", DashboardController.getDashboardData)
router.post("/completetraining", TrainingController.completeTraining)




export default router;