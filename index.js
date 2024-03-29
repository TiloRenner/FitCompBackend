import express from 'express'
import https from 'https'
import http from 'http'
import fs from 'fs'
import cors from 'cors'
import AssessmentRouter from './router/assessmentRouter.js'
import AuthenticationRouter from './router/authenticationRouter.js';
import UserRouter from './router/userRouter.js'
import {v4 as uuidv4} from 'uuid';
import 'dotenv/config';
import session from 'express-session'
import {default as connectMongoDBSession} from 'connect-mongodb-session'
import IsAuth from './middleware/isAuth.js'



import MongooseHelper from "./utils/mongooseHelper.js";

const oneDay = 1000*60*60*24;



const db = MongooseHelper.connectDB()
const MongoDBStore = connectMongoDBSession(session)
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'userSessions'

})


const app = express();
const sessions ={};


app.set('trust proxy', 1) // trust first proxy
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
    name:"fitcomp.sid",
    secret: process.env.Session_Secret,
    resave:false,
    saveUninitialized:false,
    store: store,
    cookie: { sameSite:'none', secure: true}
    /*cookie : { 
        maxAge:oneDay,
        httpOnly:true,
        secure:true, 
        sameSite:'none', 
        domain: process.env.cookiedomain
    }*/
}))
app.use(cors({origin: true, methods:["POST", "GET","OPTIONS","HEAD"],credentials:true}))

app.use("/authentication", AuthenticationRouter);
app.use("/assessment",AssessmentRouter);
app.use("/user",IsAuth.allRoles,UserRouter)

app.get("/cookie",(req,res)=>{

    console.log("Called Cookieget")
    const sessionId = uuidv4();
    //res.set('Set-Cookie', `session=${sessionId}`)
    console.log()
    
    res.cookie('session',sessionId, {maxAge:oneDay,domain: process.env.cookiedomain, sameSite:'none', secure: true, partitioned: true })
    res.json({messsage : 'Success'})

})




app.get("/userauth_test1",IsAuth.allRoles, (req,res) => {

    console.log("Called userAuth")
    res.status(200).json({message:"You have made it, you seem to be a registered user.", })

})
app.get("/adminauth_test1", IsAuth.admin,(req,res) => {

    res.status(200).json({message:"You have made it, you seem to be a registered admin."})

})






http.createServer(app).listen(8080,()=>{console.log('Listening on port 8080 over http')});

let options = {}

if(process.env.devmode)
{
    console.log("Devmode")
    options = {
        key: fs.readFileSync('p:/localhost-key.pem'),
        cert:fs.readFileSync('p:/localhost.pem')
    };

}

const httpsServer = https.createServer(options,app);

httpsServer.listen(8081,()=>{console.log('Listening on port 8081 over https')});
/*app.listen(8080, ()=> {
    console.log('Listening on port 8080')
})*/


