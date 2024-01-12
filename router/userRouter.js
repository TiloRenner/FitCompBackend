import express from 'express';
import TrainingPlanController from "../controller/trainingPlanController.js";


const router = express.Router()



router.get("/trainingplan", TrainingPlanController.trainingPlan)



export default router;