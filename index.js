import express from 'express'
import cors from 'cors'
import AssessmentRouter from './router/assessmentRouter.js'
import AuthenticationRouter from './router/authenticationRouter.js';


import MongooseHelper from "./utils/mongooseHelper.js";

MongooseHelper.connectDB()


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/authentication", AuthenticationRouter);
app.use("/assessment",AssessmentRouter);




app.listen(8080, ()=> {
    console.log('Listening on port 8080')
})


