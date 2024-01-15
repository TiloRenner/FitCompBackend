import express from 'express';
import TrainingPlanController from "../controller/trainingPlanController.js";
import UserController from '../controller/userController.js';


const router = express.Router()



router.get("/trainingplan", TrainingPlanController.trainingPlan)
//router.post("/trainingplan", TrainingPlanController.trainingPlan)




export default router;