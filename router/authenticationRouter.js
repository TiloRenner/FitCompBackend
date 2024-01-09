import express from 'express'
import AuthenticationController from '../controller/authenticationController.js';


const router = express.Router()



router.post("/register", AuthenticationController.register)






export default router;