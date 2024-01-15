import express from 'express'
import AssessmentController from '../controller/assessmentController.js'
import IsAuth from '../middleware/isAuth.js'


const router = express.Router()

router.get("/questions", AssessmentController.serveAssessmentQuestions )
router.get("/categories", AssessmentController.serveCategories )
router.post("/adjustedProduct",IsAuth.allRoles, AssessmentController.serveAdjustedProduct )



export default router;