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
        console.log(req.body);


        const baseproduct = 
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
        }

        const adjustedExercises = baseproduct.exercises.map((exercise) =>
            {
                const matchingAnswer = req.body.answers.find((answer) => answer.questionId == exercise.questionId

                )
                exercise.reps = Math.floor(matchingAnswer.valueEntered *1.2)
                return exercise;

            }
        )

        

        const adjustedProduct = 
        {
            category : 1
        }
        adjustedProduct.exercises = adjustedExercises;



        res.status(200).json({
          message: 'Soon with adjusted product',
          adjustedProduct
        });
    }

}

export default AssessmentController;