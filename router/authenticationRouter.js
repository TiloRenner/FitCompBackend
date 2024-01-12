import express from 'express'
import AuthenticationController from '../controller/authenticationController.js';
import IsAuth from '../middleware/isAuth.js';


const router = express.Router()



router.post("/register",IsAuth.notLoggedIn, AuthenticationController.register)
router.post("/login",IsAuth.notLoggedIn, AuthenticationController.login)
router.get("/logout",IsAuth.allRoles, AuthenticationController.logout)
router.get("/status",IsAuth.allRoles, AuthenticationController.status)





export default router;