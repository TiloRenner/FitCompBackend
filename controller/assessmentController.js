import mongoose from 'mongoose'
import baseProduct from '../models/baseProductModel.js'
import MongooseHelper from '../utils/mongooseHelper.js'

const AssessmentController =
{

    serveAssessmentQuestions: async function (req,res)
    {

        console.log(req.query.category)

        const category = req.query.category

        var questions_package = {steps:0,questions : []};
        

        if(category)
        {
            try
            {
                const matchingProduct = await MongooseHelper.findProductByCategory(category)
                console.log("MatchingProduct: ", matchingProduct)
                if(matchingProduct)
                {
                    if(matchingProduct.exercises && matchingProduct.exercises.length > 0)
                    {
                        const matchingExercisesAll = await Promise.all (matchingProduct.exercises.map(prodExercise =>
                            {
                                return MongooseHelper.findExerciseById(prodExercise.exerciseId)
                            }))
                        //console.log("Exercises in Product: " , matchingExercisesAll)
                        if(matchingExercisesAll && matchingExercisesAll.length == matchingProduct.exercises.length)
                        {
                            const exerciseQuestions = matchingProduct.exercises.map((productExercise) =>
                                {
                                    const matchingExercise = matchingExercisesAll.find(exercise => {
                                        return exercise._id.equals(productExercise.exerciseId)})
                                    //console.log("MatchingExercise:" , matchingExercise, "ProdExer: ", productExercise)

                                        const maxReps = productExercise.levels.reduce((prev,current) =>
                                        {
                                            return (prev && prev.reps > current.reps) ? prev : current
                                        }
                                        ).reps;
                                        console.log("Max:" , maxReps)

                                        const defaultReps = Math.floor(maxReps / 2)

                                        const id = matchingExercise._id.toString()
                                        console.log("QuestionID:" , id)

                                        const textGerman = matchingExercise.info.find((info) =>
                                        {
                                            return info.lang =="de"
                                        })

                                        const answerStrings = matchingExercise.info.map((info) =>
                                            {
                                                return {lang:info.lang, text:info.name}
                                            }
                                            
                                        )

                                        console.log("GermanText:" , textGerman)
                                        
                                        const question ={
                                            questionId:id,
                                            questionType:"skill",
                                            questionTextGerman:textGerman.assessmentQ,
                                            questionText:matchingExercise.info,
                                            answerType:"slider",
                                            answers:[{
                                                aTextGerman:textGerman.name,
                                                answerText:answerStrings,
                                                valueMin:0,
                                                valueMax:maxReps,
                                                valueDefault:defaultReps,
                                            }]
                                        }

                                        console.log("Question: " ,question)

                                        return question;
                                        
                                }
                            )

                            questions_package.questions = questions_package.questions.concat(exerciseQuestions)

                        }
                        else
                        {
                            console.error("No Exercises found or Length mismatch to Product")
                        }
                    }
                    else
                    {
                        console.error("No Exercises found in Product " , matchingProduct)
                    }

                }
                else
                {
                    console.error("No Matching Product found for Category: ", category)
                }

            }
            catch(err)
            {
                console.error("Error: ", err.message)
            }

        }

        /*questions_package = {
            steps:4,
            questions: [
                {
                    questionTextGerman:"Wie oft treibst du in der Woche Sport",
                    questionType:"skill",
                    questionId:100,
                    answerType:"fixed",
                    answers: [
                        {
                            aTextGerman:"Niemals",
                            value: 1  
                        },
                        {
                            aTextGerman:"1 mal in der Woche",
                            value: 10  
                        },
                        {
                            aTextGerman:"2-4 mal in der Woche",
                            value: 50  
                        },
                        {
                            aTextGerman:"20 mal in der Woche",
                            value: 100  
                        }
    
                    ]
                },
                {
                    questionTextGerman:"Wieviel Minuten kannst du pro Tag für das Training aufwenden?",
                    questionType:"skill",
                    questionId:101,
                    answerType:"slider",
                    answers: [
                        {
                            aTextGerman:"Minuten",
                            valueMin: 5,
                            valueMax:  120,
                            valueDefault:30
                        }
                    ]
                },
                {
                    questionTextGerman:"Wie viele Liegestütze schaffst du an einem Stück?",
                    questionType:"skill",
                    questionId:102,
                    answerType:"slider",
                    answers: [
                        {
                            aTextGerman:"Liegestütze",
                            valueMin: 0,
                            valueMax:  50,
                            valueDefault:20
                        }
                    ]
                },
                {
                    questionTextGerman:"Wie viele Kniebeuge schaffst du an einem Stück?",
                    questionType:"skill",
                    questionId:103,
                    answerType:"slider",
                    answers: [
                        {
                            aTextGerman:"Kniebeuge",
                            valueMin: 0,
                            valueMax:  80,
                            valueDefault:35
                        }
                    ]
                }
            ],
            results:[
                {test:0}
    
            ]
        }*/

        questions_package.steps = questions_package.questions.length
        
        res.status(200).json(questions_package)

    },

    serveCategories : async function(req,res){

        console.log(req.query.category)
        //console.log("Called Categories",req.session)
        //const categories = [{id:1, nameGerman:"Abnehmen"},{id:2, nameGerman:"Muskeln aufbauen"},{id:3, nameGerman:"Yoga"},{id:4, nameGerman:"Irgendwas noch"}]

        //var id = mongoose.Types.ObjectId.createFromHexString('65a13215c14823e42b435456')
        //var id = mongoose.mongo.BSONPure.ObjectID.fromHexString('6599134cb4ec8708cde1ddda')
        //const product = await baseProduct.findById(id)
        const products = await MongooseHelper.findAllProducts();

        console.log(products)

        if(products)
        {
            var categories = products.map((product)=> {
                console.log(product)
                return {id: product.category,deprecated:"nameGerman verschwindet bald!!!!",nameGerman:product.info[0].name , info:product.info};
            })
        }
        res.status(200).json(categories)
    },
    serveAdjustedProduct: async function (req,res){
        var increaseFactor = 1.1;
        console.log(req.body);

        const {category,answers} = req.body

        /*const baseproduct = 
        {
            category : 1,
            exercises: [
                {
                    name: "Liegestütze",
                    questionId : 102,
                    reps: 50 
                },
                {
                    name: "Kniebeuge",
                    questionId : 103,
                    reps: 40

                }


            ]
        }*/

        const baseProduct = await MongooseHelper.findProductByCategory(category)
        console.log("BaseProduct:", baseProduct)

        const levelNames = await MongooseHelper.findLevelNames();
        console.log("LevelNames:" , levelNames)

        const matchingExercisesAll = await Promise.all (baseProduct.exercises.map(prodExercise =>
            {
                return MongooseHelper.findExerciseById(prodExercise.exerciseId)
            }))

        const adjustedExercises = baseProduct.exercises.map((exercise) =>
            {
                console.log("Exercise:", exercise, "ID:" ,exercise.exerciseId )
                const matchingAnswer = answers.find((answer) => 
                {
                    const questionID = MongooseHelper.returnObjectIdFromHextString(answer.questionId)
                    console.log("QuestionID:" , questionID, "ExerciseID:" , exercise.exerciseId)
                    return exercise.exerciseId.equals(questionID);

                })
                console.log("Match:", matchingAnswer)
                if(matchingAnswer)
                {
                   const info = matchingExercisesAll.find(info => info._id.equals(exercise.exerciseId))
                    console.log("info: ", info)
                    console.log("Found matching Exercise for " ,exercise.exerciseId.toString() , " : " , matchingAnswer)
                    //Build Sets and Repetitions based on Answer
                    //exercise.reps = Math.floor(matchingAnswer.valueEntered *100)

                    
                    const targetReps = Math.ceil(matchingAnswer.valueEntered * increaseFactor)

                    console.log("Closest : ------------------" )
                    const closestLevel = exercise.levels.reduce((prev,current) =>
                    {
                        //console.log("Current" , current ,"Prev" ,  prev, " Target: " , targetReps , "C:" ,Math.abs(targetReps - current.reps) , "P:", Math.abs(targetReps - prev.reps) )
                        
                        const result = Math.abs(targetReps - current.reps) < Math.abs(targetReps - prev.reps) ? current : prev
                        //console.log("Result:" ,test)
                        return result;
                    })
                    
                    console.log("Closest Level:" , closestLevel)

                    console.log("Actual------------------")

                   const actualLevel = exercise.levels.reduce((prev,current) =>
                    {
                        console.log("Current: " , current ," Prev: " ,  prev, " Target: " , targetReps)
                        const result = (targetReps > current.reps) ? current : prev
                        console.log("Result:" , result)
                        return result;
                    },{level:1 , sets: 0 ,reps: 0 }) //|| { level:1 }
                    /*const actualLevel = exercise.levels.find(level => {
                        const result =  targetReps >= level.reps
                        console.log("Find Result:" , result, "Target:", targetReps , "Level: ",level)
                    
                        return result;
                    }) || { level:1 }*/

                    console.log("Closest Level:" , closestLevel)
                    console.log("Actual Level:" , actualLevel, "target: " , targetReps)
                    //Find levelName

                    //console.log(levelNames)
                    const matchingLevelInfo = levelNames.find(levelName =>
                        {
                        //console.log("LVLNAME:", levelName)
                        return levelName.level == actualLevel.level
                        }
                    )

                    //console.log("LevelInfo: " , matchingLevelInfo)
                    

                  
                    
                    const adjustedExercise ={
                        exerciseId: exercise.exerciseId.toString(),
                        level:closestLevel.level,
                        sets:closestLevel.sets,
                        reps:targetReps,
                        info:info.info,
                        levelName: matchingLevelInfo.text
                    }
                    return adjustedExercise;
                }
                else
                {
                    console.error("Could not find Matching Exercise for Products Exercise ", exercise.questionId ," in Post Data")
                }

            }
        )

        

        const adjustedProduct = 
        {
            category : category
        }
        adjustedProduct.exercises = adjustedExercises;



        res.status(200).json({
          
          adjustedProduct
        });
    }

}

export default AssessmentController;