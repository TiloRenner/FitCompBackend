import express from 'express'
import AssessmentController from '../controller/assessmentController.js'


const router = express.Router()

router.get("/questions", AssessmentController.serveAssessmentQuestions )
router.get("/categories", AssessmentController.serveCategories )
router.post("/adjustedProduct", AssessmentController.serveAdjustedProduct )



export default router;