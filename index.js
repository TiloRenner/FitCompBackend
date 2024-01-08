import express from 'express'
import cors from 'cors'
import AssessmentRouter from './router/assessmentRouter.js'


const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/assessment",AssessmentRouter);



app.listen(8080, ()=> {
    console.log('Listening on port 8080')
})


