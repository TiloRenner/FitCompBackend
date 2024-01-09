import express from 'express'
import AuthenticationController from '../controller/authenticationController.js';


const router = express.Router()



router.post("/register", AuthenticationController.register)
router.post("/login", AuthenticationController.login)





export default router;